<template>
    <div class="form">
        <div class="form__logo">
            <img class="form__logo-icon" src="../assets/images/logo.png" alt="Logo"/>
            <h1 class="form__logo-label">SCETIC</h1>
        </div>

        <form @submit.prevent="submitForm" class="form__field-inner">
            <div v-for="field in data.fields" :key="field.id" class="form__field">
                <span v-if="closed" class="form__label">{{ field.label }}</span>
                <v-fields
                        :field="field"
                        v-model="field.value"
                        :placeholder="field.placeholder"
                />
                <p v-if="field.error" class="form__error">{{ field.error }}</p>
            </div>
            <div v-if="showPasswordStrength" class="password-strength">
                Strength: <span :class="passwordStrengthClass">{{ passwordStrength }}</span>
            </div>
            <button
                    type="submit"
                    class="form__btn"
                    :disabled="isSubmitting || !isFormValid"
            >
                <span v-if="isSubmitting">Loading...</span>
                <span v-else> {{ $t('register.btnValue')}}</span>
            </button>
        </form>

    </div>
</template>


<script setup>
import VFields from '../src/components/v-fields.vue'
import {ref , computed} from 'vue'
import {useRouter} from 'vue-router'
import {useHabitStore} from '../stores/habitStore.js'
import {validateEmail, validatePassword, validateConfirmPassword, validateName} from '../src/utils/validations.js';

const habitStore = useHabitStore()
const router = useRouter()

const data = ref({
    fields: [
        {
            id: 1,
            name: "name",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            autocomplete: "name",
            value: "",
            error: false,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            label: "Email Address",
            placeholder: "Enter your email",
            autocomplete: "email",
            value: "",
            error: false,
        },
        {
            id: 3,
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Enter your password",
            autocomplete: "new-password",
            value: "",
            error: false,
        },
        {
            id: 4,
            name: "confirm",
            type: "password",
            label: "Confirm Password",
            placeholder: "Confirm your password",
            autocomplete: "new-password",
            value: "",
            error: false,
        },
    ],
})
const isSubmitting = ref(false);
const showPasswordStrength = ref(false);
const passwordStrength = ref('');
const isFormValid = computed(() => data.value.fields.every((field) => !field.error && field.value.trim() !== ''));
const closed = ref(false)
const passwordStrengthClass = computed(() => {
    if (passwordStrength.value === 'Weak') return 'weak';
    if (passwordStrength.value === 'Medium') return 'medium';
    if (passwordStrength.value === 'Strong') return 'strong';
    return '';
});
watch(() => data.value.fields, (fields) => {
        fields.forEach((field) => {
            if (field.error) {
                validateField(field);
            }
        });
    }, {deep: true}
);

const validateField = (field) => {
    if (!field.value.trim()) {
        field.error = `${field.label} is required.`;
        return;
    }
    switch (field.name) {
        case 'email':
            field.error = !validateEmail(field.value) ? 'Invalid email format.' : '';
            break;
        case 'password':
            const strength = validatePassword(field.value);
            passwordStrength.value = strength;
            showPasswordStrength.value = true;
            field.error = strength === 'Weak' ? 'Password is too weak.' : '';
            break;
        case 'confirm':
            const passwordField = data.value.fields.find((f) => f.name === 'password');
            field.error = !validateConfirmPassword(passwordField.value, field.value)
                ? 'Passwords do not match.'
                : '';
            break;
        case 'name':
            field.error = !validateName(field.value) ? 'Name must be at least 2 characters long.' : '';
            break;
        default:
            field.error = '';
    }
};
const submitForm = async () => {
    isSubmitting.value = true;

    data.value.fields.forEach(validateField);
    if (!isFormValid.value) {
        isSubmitting.value = false;
        return;
    }
    const userData = data.value.fields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
    }, {});
    try {
        await habitStore.setUserData(userData);
        router.push('/welcomePage');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again later.');
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style>
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