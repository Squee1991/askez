export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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