import {defineStore} from 'pinia';
import {ref} from 'vue';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	deleteUser,
	onAuthStateChanged
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
		const name = ref(null);
		const email = ref(null);
		const password = ref(null);

		const setUserData = (data) => {
			name.value = data.name;
			email.value = data.email;
			password.value = data.password;
		};

		const registerUser = async (userData) => {
			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				userData.email,
				userData.password
			);
			await updateProfile(userCredential.user, {
				displayName: userData.name
			});
			setUserData(userData);
		};

		const loginUser = async ({email, password}) => {
			const auth = getAuth();
			await signInWithEmailAndPassword(auth, email, password);
		};
		const logout = () => {
			const auth = getAuth();
			signOut(auth);
			name.value = null;
			email.value = null;
			password.value = null;
		};

		const deleteAccount = async () => {
			const auth = getAuth();
			const user = auth.currentUser;
			if (!user) return;
			await deleteUser(user)
			name.value = null;
			email.value = null;
		};

		const fetchingUser = () => {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setUserData({
						name: user.displayName,
						email: user.email
					})
				}
			})
		}

		const UpdateNameDisplayName = async (newName) => {
			const auth = getAuth()
			const user = auth.currentUser
			if (!user) return;
			await updateProfile(user, {
				displayName: newName
			})
			name.value = newName
		};

		fetchingUser();

		return {
			name,
			email,
			password,
			setUserData,
			registerUser,
			loginUser,
			logout,
			deleteAccount,
			fetchingUser,
			UpdateNameDisplayName
		};
	}
);
