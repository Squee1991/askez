import {defineStore} from "pinia";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "firebase/auth";


export const useValidationStore = defineStore('validation', () => {
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateUsers = (fields) => {
        return fields.find(field =>
            field.password.length >= 6 ||
            field.name.length >= 2 ||
            field.confirmPassword === field.password
        );
    };

    const getPasswordStrength = (password) => {
        const strength = {
            score: 0,
            text: 'Weak',
            class: 'weak'
        }

        if (password.length >= 8) strength.score++
        if (/[A-Z]/.test(password)) strength.score++
        if (/[0-9]/.test(password)) strength.score++
        if (/[^A-Za-z0-9]/.test(password)) strength.score++

        switch (strength.score) {
            case 4:
                strength.text = 'Strong'
                strength.class = 'strong'
                break
            case 3:
                strength.text = 'Medium'
                strength.class = 'medium'
                break
            default:
                strength.text = 'Weak'
                strength.class = 'weak'
        }

        return strength
    }

    const getFirebaseError = (error) => {
        switch (error.code) {
            case 'auth/email-already-in-use':
                return 'Email already exists';
            case 'auth/invalid-email':
                return 'Invalid email';
            case 'auth/weak-password':
                return 'Password too weak';
            case 'auth/user-not-found':
                return 'User not found';
            case 'auth/wrong-password':
                return 'Incorrect password';
            default:
                return 'An error occurred';
        }

    };
    return {
        validateEmail,
        validateUsers,
        getPasswordStrength,
        getFirebaseError,

    }
})