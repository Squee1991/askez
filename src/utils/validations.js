
export const validateEmail = (email) => {
    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const loginUser = async (email, password) => {
    if (!validateEmail(email)) {
        console.error('Ошибка: Некорректный email');
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
    } catch (error) {
        console.error('Error signing in:', error.message);
    }
};
export const validatePassword = (password) => {
    if (password.length < 6) return 'Weak';
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[@$!%*?&#]/.test(password)) {
        return 'Strong';
    }
    return 'Medium';
};

export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};

export const validateName = (name) => {
    return name.trim().length > 1;
};