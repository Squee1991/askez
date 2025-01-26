export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Проверка пароля
export const validatePassword = (password) => {
    if (password.length < 6) return 'Weak';
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[@$!%*?&#]/.test(password)) {
        return 'Strong';
    }
    return 'Medium';
};

// Проверка совпадения паролей
export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};

// Проверка имени
export const validateName = (name) => {
    return name.trim().length > 1;
};