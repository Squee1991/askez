<template>
    <div class="form">
        <div class="form__logo">
            <div class="logo">
                <img src="../assets/images/logo.png" alt="Logo"/>
                <h1>SCETIC</h1>
            </div>

        </div>
        <div class="form__field-inner">
            <div v-for="field in data.fields" :key="field.id" class="form__field">
                <span class="form__label"> {{ field.label }}</span>
                <v-fields
                        :field="field"
                        v-model="field.value"
                        :placeholder="field.placeholder"
                />
                <p v-if="field.error" class="form__error">{{ field.error }}</p>
            </div>
            <button @click="submitForm" class="form__btn"> Registration</button>
        </div>
    </div>
</template>

<script setup>
import VFields from '../src/components/v-fields.vue'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useHabitStore} from '../stores/habitStore.js'

const habitStore = useHabitStore()

const router = useRouter()
const data = ref({
    fields: [
        {
            id: 1,
            name: "name",
            type: "text",
            label: "Name",
            placeholder: "Enter you name",
            value: "",
            error: null
        },
        {
            id: 2,
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "Enter you email",
            value: "",
            error: null
        },
        {
            id: 3,
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Enter you password",
            value: "",
            error: null
        }
    ],
})

const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must include at least one uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("Password must include at least one number");
    }
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //     errors.push("Password must include at least one special character");
    // }
    return errors;
};
const submitForm = () => {
    const allFieldsFilled = data.value.fields.every((field) => field.value.trim() !== "");
    if (!allFieldsFilled) {
        alert('empty')
        return
    }
    const emailField = data.value.fields.find((field) => field.name === "email");
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (emailField && !validateEmail(emailField.value)) {
        emailField.error = "Incorrect email format";
        return;
    }
    const passwordField = data.value.fields.find((field) => field.name === "password");
    if (passwordField) {
        const passwordErrors = validatePassword(passwordField.value);
        if (passwordErrors.length > 0) {
            passwordField.error = passwordErrors.join(", ");
            return;
        }
    }
    const nameField = data.value.fields.find((field) => field.name === "name");
    if (nameField) {
        habitStore.setUsername(nameField.value);
        router.push('/welcomePage');
    }
};

</script>

<style>

input {
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
    margin-top: 10px;
}

input:focus {
    border-color: #4A90E2;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
}

.form {
    max-width: 400px;
    width: 100%;
    padding: 40px;
    background: #e5f9ed;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form__logo {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 20px;
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    width: 50px;
}

.form__logo h1 {
    font-size: 24px;
    color: #333;
    margin-top: 10px;
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
</style>

