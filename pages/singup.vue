<template>
    <div class="form">
        <div class="form__logo">
            <img class="form__logo-icon" src="../assets/images/logo.png" alt="Logo"/>
            <h1 class="form__logo-label">SCETIC</h1>
            <div>{{ store }}</div>
        </div>

        <transition name="fade-slide" mode="out-in">
            <form @submit.prevent="submitForm" class="form__field-inner" :key="isSignUp">
                <h2>{{ isSignUp ? 'Sign Up' : 'Sign In' }}</h2>

                <div v-for="field in filteredFields" :key="field.id" class="form__field">
                    <!--                    <span v-if="closed" class="form__label">{{ field.label }}</span>-->
                    <v-fields
                            :field="field"
                            v-model="field.value"
                            :placeholder="field.placeholder"
                    />
                    <p v-if="field.error" class="form__error">{{ field.error }}</p>
                </div>

                <div v-if="isSignUp && showPasswordStrength" class="password-strength">
                    Strength: <span :class="passwordStrengthClass">{{ passwordStrength }}</span>
                </div>

                <button
                        type="submit"
                        class="form__btn"
                        :disabled="isSubmitting || !isFormValid"
                >
                    <span v-if="isSubmitting">Loading...</span>
                    <span v-else> {{ isSignUp ? 'Sign Up' : 'Sign In' }}</span>
                </button>

                <p class="toggle-text" @click="toggleAuthMode">
                    {{ isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }}
                </p>
            </form>
        </transition>
    </div>
</template>

<script setup>
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import VFields from '../src/components/v-fields.vue'
import {ref, computed, watch} from 'vue'
import {useRouter} from 'vue-router'
import {useHabitStore} from '../stores/habitStore.js'
import {validateEmail, validatePassword, validateConfirmPassword, validateName} from '../src/utils/validations.js';

const habitStore = useHabitStore()
const router = useRouter()
const isSignUp = ref(true);
const email = ref('');
const password = ref('');

const data = ref({
    fields: [
        {
            id: 1,
            name: "name",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            value: "",
            error: false,
            required: true
        },
        {
            id: 2,
            name: "email",
            type: "email",
            label: "Email Address",
            placeholder: "Enter your email",
            value: "",
            error: false,
            required: true
        },
        {
            id: 3,
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Enter your password",
            value: "",
            error: false,
            required: true

        },
        {
            id: 4,
            name: "confirm",
            type: "password",
            label: "Confirm Password",
            placeholder: "Confirm your password",
            value: "",
            error: false,
            required: true
        },
    ],
})

const filteredFields = computed(() => isSignUp.value ? data.value.fields : data.value.fields.filter(f => f.name !== 'name' && f.name !== 'confirm'));
const isSubmitting = ref(false);
const showPasswordStrength = ref(false);
const passwordStrength = ref('');
const isFormValid = computed(() => filteredFields.value.every(f => !f.error && f.value.trim() !== ''));
const store = ref(null)

watch(() => data.value.fields, (newFields) => {
    newFields.forEach(field => {
        field.error = false;
        const value = field.value.trim();

        if (field.required && !value) {
            field.error = 'This field is required';
            return;
        }

        switch (field.name) {
            case 'email':
                if (!validateEmail(value)) field.error = 'Invalid email format';
                break;
            case 'password':
                if (!validatePassword(value)) field.error = 'Password must be at least 6 characters';
                break;
            case 'confirm':
                const password = newFields.find(f => f.name === 'password')?.value || '';
                if (!validateConfirmPassword(password, value)) field.error = 'Passwords do not match';
                break;
            case 'name':
                if (!validateName(value)) field.error = 'Name must be at least 2 characters';
                break;
        }
    });
},);
const submitForm = async () => {
    const emailField = data.value.fields.find(f => f.name === 'email');
    const passwordField = data.value.fields.find(f => f.name === 'password');
    const nameField = data.value.fields.find(f => f.name === 'name');

    if (!emailField || !passwordField) {
        console.error('Email или пароль не найдены в data.fields');
        return;
    }

    const email = emailField.value.trim();
    const password = passwordField.value.trim();
    const name = nameField?.value.trim() || '';

    try {
        const auth = getAuth();

        if (isSignUp.value) {
            // Регистрация
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Обновляем профиль с именем
            await updateProfile(userCredential.user, {
                displayName: name
            });

            // Здесь можно добавить сохранение в базу данных
            console.log('User registered:', userCredential.user);
        } else {
            // Авторизация
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);
        }

        // Перенаправление на защищенную страницу
        router.push('/welcomePage');

    } catch (error) {
        console.error('Error:', error.code, error.message);

        // Обработка ошибок Firebase
        switch (error.code) {
            case 'auth/email-already-in-use':
                emailField.error = 'Email already exists';
                break;
            case 'auth/invalid-email':
                emailField.error = 'Invalid email';
                break;
            case 'auth/weak-password':
                passwordField.error = 'Password too weak';
                break;
            case 'auth/user-not-found':
                emailField.error = 'User not found';
                break;
            case 'auth/wrong-password':
                passwordField.error = 'Incorrect password';
                break;
            default:
                emailField.error = 'An error occurred';
        }
    }
};

watch(isSignUp, (newVal) => {
    if (!newVal) {
        data.value.fields.forEach(field => {
            if (field.name === 'name' || field.name === 'confirm') {
                field.value = ''; // Сброс значения
            }
        });
    }
});


const toggleAuthMode = () => isSignUp.value = !isSignUp.value;
</script>

<style>
.toggle-text {
    text-align: center;
    cursor: pointer;
    color: #4A90E2;
    margin-top: 15px;
}

.toggle-text:hover {
    text-decoration: underline;
}

.fade-slide-enter-active, .fade-slide-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from, .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.password-strength {
    margin-bottom: 15px;
    font-size: 14px;
}

.weak {
    color: red;
}

.medium {
    color: orange;
}

.strong {
    color: green;
}

input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

input:focus {
    border: 1px solid #4A90E2;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.4);
}

.form {
    width: 100%;
    padding: 30px;
    background: var(--background-color);
    height: 100vh;
}

.form__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
    color: var(--text-color);
}

.form__logo-icon {
    padding: 5px;
    width: 60px;
}

.form__field {
    margin-bottom: 20px;
}

.form__field-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    margin-bottom: 50px;
}

.form__btn {
    width: 100%;
    background-color: #4A90E2;
    color: white;
    font-size: 18px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.form__btn:hover {
    background-color: #357ABD;
}

.form__btn:hover {
    opacity: 1;
    cursor: pointer;
}

.form__error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.form__label {
    font-weight: 600;
    color: var(--text-color);
    font-size: 13px;
    font-family: "Nunito", serif;
    padding-bottom: 5px;
}
</style>
