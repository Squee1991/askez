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

    const getFirebaseError = (error) => {
        switch (error.code) {
            case 'auth/email-already-in-use':
                return 'Email already exists';
            case 'auth/invalid-email':
                return 'Invalid email1';
            case 'auth/weak-password':
                return 'Password too weak';
            case 'auth/user-not-found':
                return 'User not found';
            case 'auth/wrong-password':
                return 'Incorrect password';
            default:
                return 'Wrong password';
        }
    };

    return {
        validateEmail,
        validateUsers,
        getFirebaseError,
    }
})