import { defineStore } from 'pinia';

export const useValidationStore = defineStore('validation', () => {
	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

	const validateUsers = (fields, mode = 'signUp') => {
		const errors = {};
		const emailField = fields.find(f => f.name === 'email');
		const passwordField = fields.find(f => f.name === 'password');
		const nameField = fields.find(f => f.name === 'name');
		const confirmField = fields.find(f => f.name === 'confirm');

		if (emailField && !validateEmail(emailField.value.trim())) {
			errors.email = 'Wrong format email';
		}

		if (passwordField && mode === 'signUp' && passwordField.value.trim().length < 6) {
			errors.password = 'Password too weak';
		}

		if (nameField && mode === 'signUp' && nameField.value.trim().length < 2) {
			errors.name = 'Name too short';
		}

		if (confirmField && passwordField &&
			mode === 'signUp' &&
			confirmField.value.trim() !== passwordField.value.trim()) {
			errors.confirm = 'Passwords do not match';
		}

		return errors;
	};

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
			case 'auth/too-many-requests':
				return 'Too many requests, try later';
			case 'auth/wrong-password':
				return 'Incorrect password';
			case 'auth/invalid-credential':
				return 'Incorrect password';
		}
	};

	return {
		validateEmail,
		validateUsers,
		getFirebaseError
	};
});
