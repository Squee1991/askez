import { defineStore } from 'pinia';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
export const useAuthStore = defineStore('auth', () => {

    const user = ref(null);

    const setUserData = (userData) => {
        user.value = userData;
        localStorage.setItem("userData", JSON.stringify(userData));
    };
    const loadUserData = () => {
        const savedData = localStorage.getItem("userData");
        if (savedData) {
            user.value = JSON.parse(savedData);
        }
    };
    const updateUserData = (newData) => {
        if (newData.name) user.value.name = newData.name;
        if (newData.email) user.value.email = newData.email;
        localStorage.setItem("userData", JSON.stringify(user.value));
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

        // Дополнительная логика сохранения пользователя
    };

    const loginUser = async ({ email, password }) => {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
    };

    return {
        user,
        updateUserData,
        setUserData,
        loadUserData,
        registerUser,
        loginUser };
});