import {defineStore} from 'pinia';
import {ref} from 'vue';
import {doc, setDoc, getDoc, getFirestore} from "firebase/firestore";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	deleteUser,
	onAuthStateChanged,
	sendPasswordResetEmail
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
		const db = getFirestore();
		const name = ref(null);
		const email = ref(null);
		const password = ref(null);
		const setUserData = (data) => {
			name.value = data.name;
			email.value = data.email;
			password.value = data.password;
		};

		const registerUser = async (userData) => {
			try {
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
			} catch (error) {
				console.error(error.message);
				throw error;
			}
		};

		const loginUser = async ({email, password}) => {
			const auth = getAuth();
			await signInWithEmailAndPassword(auth, email, password);
		};

		const logout = async () => {
			const auth = getAuth();
			await signOut(auth);
			name.value = null;
			email.value = null;
			password.value = null;
		};

		const resetPassword = async (email) => {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
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

		const saveLanguageToFirebase = async (lang) => {
			const auth = getAuth();
			const user = auth.currentUser;
			if (!user) return;

			const userDocRef = doc(db, "users", user.uid);
			await setDoc(userDocRef, {language: lang}, {merge: true});
		};

		const loadLanguageFromFirebase = async () => {
			const auth = getAuth();
			const user = auth.currentUser;
			if (!user) return null;

			const userDocRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(userDocRef);
			if (docSnap.exists()) {
				return docSnap.data().language || null;
			}
			return null;
		};

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
			saveLanguageToFirebase,
			loadLanguageFromFirebase,
			setUserData,
			registerUser,
			loginUser,
			logout,
			deleteAccount,
			fetchingUser,
			UpdateNameDisplayName,
			resetPassword
		};
	}
);
