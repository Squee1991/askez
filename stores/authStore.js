import {defineStore} from 'pinia';
import {ref} from 'vue';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    deleteUser,
    onAuthStateChanged,
    sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';
import {doc, setDoc, getDoc, getFirestore} from 'firebase/firestore';
import {Capacitor} from '@capacitor/core';
import {Purchases} from '@revenuecat/purchases-capacitor';

export const useAuthStore = defineStore('auth', () => {
    const db = getFirestore();
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);
    const confidence = ref(6);
    const isPacerEnabled = ref(false)
    const isPremium = ref(false);
    const isBotEnabled = ref(false);
    const isGateOpened = ref(false);
    const premiumExpired = ref(false);

    const trigerPremiumExpired = () => {
        premiumExpired.value = true;
    };

    const togglePacer = async () => {
        const newVal = !isPacerEnabled.value;
        await savePacerToFirebase(newVal);
    };

    const setUserData = (data) => {
        name.value = data.name || null;
        email.value = data.email || null;
        password.value = data.password || null;
    };

    const saveConfidenceToFirebase = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, { confidence: confidence.value }, { merge: true });
    };

    const spendConfidence = async (amount) => {
        if (confidence.value >= amount) {
            confidence.value -= amount;
            await saveConfidenceToFirebase();
        }
    };

    const safePurchasesCall = async (fn) => {
        if (!Capacitor.isNativePlatform()) return;
        try {
            await fn();
        } catch (e) {

        }
    };

    const loginWithGoogle = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userDocRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDocRef);

            if (!docSnap.exists()) {
                await setDoc(userDocRef, {
                    isPremium: false,
                    isBotEnabled: false,
                    isPacerEnabled: false
                });
            }
            setUserData({
                name: user.displayName,
                email: user.email
            });
            await loadBotStateFromFirebase();
            await checkRevenueCatPremium();
            await initPacerState();
            await loadConfidenceFromFirebase();
            await Purchases.logIn(user.uid);

        } catch (error) {
        }
    };

    const checkRevenueCatPremium = async () => {
        if (!Capacitor.isNativePlatform()) {
            isPremium.value = true;
            return true;
        }

        let active = false;

        await safePurchasesCall(async () => {
            const {customerInfo} = await Purchases.getCustomerInfo();
            active = !!customerInfo.entitlements.active['Premium'];
            isPremium.value = active;

            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);

                await setDoc(userDocRef, {
                    isPremium: active,
                    isBotEnabled: active ? isBotEnabled.value : false
                }, {merge: true});

                if (!active && isBotEnabled.value) {
                    isBotEnabled.value = false;
                }
            }
        });

        return active;
    };
    const startPremiumStatusPolling = () => {
        setInterval(() => {
            checkRevenueCatPremium();
        }, 5 * 60 * 1000);
    };
    const purchasePro = async () => {
        if (!Capacitor.isNativePlatform()) {
            await activatePremium();
            // return {success: true, message: '[Mock] Подписка активирована (браузер)'};
        }
        try {
            const offerings = await Purchases.getOfferings();
            if (!offerings.current || offerings.current.availablePackages.length === 0) {
                // const msg = 'Нет активных предложений';
                alert(JSON.stringify({error: msg, offerings}, null, 2));
                return {success: false, message: msg};
            }

            const pkg = offerings.current.availablePackages.find(p => p.identifier === "$rc_monthly") ||
                offerings.current.availablePackages.find(p => p.packageType === Purchases.PackageType.MONTHLY);

            if (!pkg) {
                // const msg = 'Тариф не найден ($rc_monthly)';
                alert(JSON.stringify({
                    error: msg,
                    availablePackages: offerings.current.availablePackages.map(p => p.identifier)
                }, null, 2));
                return {success: false, message: msg};
            }
            const {customerInfo} = await Purchases.purchasePackage({aPackage: pkg});
            const active = customerInfo.entitlements.active['Premium'];
            if (active) {
                await activatePremium();

                // alert(JSON.stringify({success: true, message: 'Подписка активирована!'}, null, 2));
                // return {success: true};
            // } else {
                // console.log('error')
                // const msg = 'Подписка не активна (entitlement Premium не найден)';
                // alert(JSON.stringify({error: msg, entitlements: customerInfo.entitlements}, null, 2));
                // return {success: false, message: msg};
            }
        } catch (e) {
            // alert('[RevenueCat] Ошибка:\n' + JSON.stringify({
            //     exception: e,
            //     message: e.message || 'Неизвестная ошибка'
            // }, null, 2));
            // return {success: false, message: e.message || 'Неизвестная ошибка'};
        }
    };
    const activatePremium = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {isPremium: true}, {merge: true});
        isPremium.value = true;
    };
    const markGateAsOpened = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {premiumGateOpened: true}, {merge: true});
        isGateOpened.value = true;
    };

    // const loadPremiumStatus = async () => {
    //     const auth = getAuth();
    //     const user = auth.currentUser;
    //     if (!user || !navigator.onLine) return;
    //
    //     const userDocRef = doc(db, "users", user.uid);
    //     const docSnap = await getDoc(userDocRef);
    //     if (docSnap.exists()) {
    //         isPremium.value = docSnap.data().isPremium ?? false;
    //     }
    // };

    const loadConfidenceFromFirebase = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            confidence.value = data.confidence !== undefined ? data.confidence : confidence.value;
        }
    };

    const loadGateStatus = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            isGateOpened.value = !!data.premiumGateOpened;
        }
    };
    const loadBotStateFromFirebase = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user || !navigator.onLine) return;

        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            isBotEnabled.value = data.isBotEnabled ?? true;
            // isPremium.value = data.isPremium ?? false;
        }
    };
    const saveBotStateToFirebase = async (enabled) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {isBotEnabled: enabled}, {merge: true});
        isBotEnabled.value = enabled;
    };

    const savePacerToFirebase = async (enabled) => {
        if (enabled === undefined) return
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {isPacerEnabled: enabled}, {merge: true});
        isPacerEnabled.value = enabled;
        localStorage.setItem('pacerEnabled', JSON.stringify(enabled));
    };

    const loadPacerStatus = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            isPacerEnabled.value = data.isPacerEnabled ?? false;
            localStorage.setItem('pacerEnabled', JSON.stringify(isPacerEnabled.value));
        }
    };

    const initPacerState = async () => {
        const pacerSetting = localStorage.getItem('pacerEnabled');
        if (pacerSetting !== null) {
            isPacerEnabled.value = JSON.parse(pacerSetting);
        } else {
            await loadPacerStatus();
        }
    };


    const registerUser = async (userData) => {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        await updateProfile(userCredential.user, {
            displayName: userData.name
        });

        setUserData(userData);
        isPremium.value = false;
        isBotEnabled.value = false;

        const userDocRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userDocRef, {
            isPremium: false,
            isBotEnabled: false,
            isPacerEnabled: false
        });
    }
    const loginUser = async ({email, password}) => {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        await loadBotStateFromFirebase();
        await checkRevenueCatPremium();
        await fetchingUser();
    };
    const logout = async () => {
        const auth = getAuth();
        await signOut(auth);
        name.value = null;
        email.value = null;
        password.value = null;
        isPremium.value = false;
        isBotEnabled.value = false;
        isPacerEnabled.value = false
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
        return new Promise((resolve) => {
            const auth = getAuth();
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    await loadGateStatus();
                    setUserData({
                        name: user.displayName,
                        email: user.email
                    });
                    await loadBotStateFromFirebase();
                    await checkRevenueCatPremium();
                    await initPacerState();
                    await loadConfidenceFromFirebase();
                    await Purchases.logIn(user.uid);
                } else {
                    isPremium.value = false;
                    isBotEnabled.value = false;
                    isPacerEnabled.value = false
                    name.value = null;
                    email.value = null;
                    password.value = null;
                }
                resolve();
            });
        });
    };

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
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        await updateProfile(user, {displayName: newName});
        name.value = newName;
    };

    fetchingUser();
    startPremiumStatusPolling();

    return {
        name,
        email,
        password,
        isPremium,
        isBotEnabled,
        isGateOpened,
        premiumExpired,
        confidence,
        isPacerEnabled,
        setUserData,
        activatePremium,
        // loadPremiumStatus,
        registerUser,
        loginUser,
        logout,
        deleteAccount,
        resetPassword,
        purchasePro,
        checkRevenueCatPremium,
        saveBotStateToFirebase,
        loadBotStateFromFirebase,
        saveLanguageToFirebase,
        loadLanguageFromFirebase,
        UpdateNameDisplayName,
        fetchingUser,
        markGateAsOpened,
        trigerPremiumExpired,
        togglePacer,
        savePacerToFirebase,
        loadPacerStatus,
        initPacerState,
        spendConfidence,
        loadConfidenceFromFirebase,
        loginWithGoogle
    };
});
