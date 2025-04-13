import { defineStore } from 'pinia';
import { ref } from 'vue';
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
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

export const useAuthStore = defineStore('auth', () => {
	const db = getFirestore();
	const name = ref(null);
	const email = ref(null);
	const password = ref(null);
	const isPremium = ref(false);
	const isBotEnabled = ref(false);

	const setUserData = (data) => {
		name.value = data.name || null;
		email.value = data.email || null;
		password.value = data.password || null;
	};

	const setPremium = (value) => {
		isPremium.value = value;
	};


	const activatePremium = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (!user) return;

		const userDocRef = doc(db, "users", user.uid);
		await setDoc(userDocRef, { isPremium: true }, { merge: true });
		isPremium.value = true;
	};

	const loadPremiumStatus = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (!user || !navigator.onLine) return;

		const userDocRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(userDocRef);
		if (docSnap.exists()) {
			isPremium.value = docSnap.data().isPremium ?? false;
		}
	};

	// const saveBotStateToLocal = (enabled) => {
	// 	isBotEnabled.value = enabled;
	// 	localStorage.setItem('isBotEnabled', enabled);
	// };
	//
	// const loadBotStateFromLocal = () => {
	// 	const saved = localStorage.getItem('isBotEnabled');
	// 	isBotEnabled.value = saved !== 'false';
	// };

	const loadBotStateFromFirebase = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (!user || !navigator.onLine) return;

		const userDocRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(userDocRef);
		if (docSnap.exists()) {
			const data = docSnap.data();
			isBotEnabled.value = data.isBotEnabled ?? true;
			isPremium.value = data.isPremium ?? false;
		}
	};

	const saveBotStateToFirebase = async (enabled) => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (!user) return;

		const userDocRef = doc(db, "users", user.uid);
		await setDoc(userDocRef, { isBotEnabled: enabled }, { merge: true });
		isBotEnabled.value = enabled;
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
		isPremium.value = false;
		isBotEnabled.value = false;

		const userDocRef = doc(db, "users", userCredential.user.uid);
		await setDoc(userDocRef, {
			isPremium: false,
			isBotEnabled: false
		});
	};

	// --- Вход ---
	const loginUser = async ({ email, password }) => {
		const auth = getAuth();
		await signInWithEmailAndPassword(auth, email, password);
		await loadBotStateFromFirebase();
	};

	const logout = async () => {
		const auth = getAuth();
		await signOut(auth);

		name.value = null;
		email.value = null;
		password.value = null;
		isPremium.value = false;
		isBotEnabled.value = false;
	};

	const resetPassword = async (email) => {
		const auth = getAuth();
		await sendPasswordResetEmail(auth, email);
	};

	const deleteAccount = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (!user) return;

		await deleteUser(user);
		name.value = null;
		email.value = null;
		password.value = null;
	};


	const fetchingUser = () => {
		const auth = getAuth();
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUserData({
					name: user.displayName,
					email: user.email
				});

				await loadPremiumStatus();
				await loadBotStateFromFirebase();
			} else {
				isPremium.value = false;
				isBotEnabled.value = false;
				name.value = null;
				email.value = null;
				password.value = null;
			}
		});
	};


	const saveLanguageToFirebase = async (lang) => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (!user) return;

		const userDocRef = doc(db, "users", user.uid);
		await setDoc(userDocRef, { language: lang }, { merge: true });
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
		const auth = getAuth();
		const user = auth.currentUser;
		if (!user) return;

		await updateProfile(user, {
			displayName: newName
		});
		name.value = newName;
	};

	fetchingUser();

	return {
		name,
		email,
		password,
		isPremium,
		isBotEnabled,
		setUserData,
		setPremium,
		activatePremium,
		loadPremiumStatus,
		registerUser,
		loginUser,
		logout,
		deleteAccount,
		resetPassword,
		// saveBotStateToLocal,
		// loadBotStateFromLocal,
		saveBotStateToFirebase,
		loadBotStateFromFirebase,
		saveLanguageToFirebase,
		loadLanguageFromFirebase,
		UpdateNameDisplayName,
		fetchingUser
	};
});
