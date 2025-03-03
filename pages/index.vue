<template>
    <div class="wrapper">
        <div class="container">
            <div ref="animationContainer"></div>
        </div>
        <div class="nuxt__links">
            <NuxtLink :to="localePath('/descriptionAsceze')">
                <button v-if="$i18n.locale" class="btn"> {{ $t("startPage.value")}}</button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import Lottie from 'lottie-web'
import {ref, onMounted} from 'vue'
import Panda from 'assets/animations/panda.json'
import { useLocalePath } from '#i18n';
const localePath = useLocalePath()

const animationContainer = ref(null)
const config = useRuntimeConfig()
const apiBase = config.public.apiBase;

definePageMeta({
    middleware: ['auth'],
})
console.log('apiBase test:', apiBase)
onMounted(() => {
    if (animationContainer.value) {
        Lottie.loadAnimation({
            container: animationContainer.value,
            loop: true,
            autoplay: true,
            animationData: Panda
        })
    }
})
</script>

<style scoped>

.container {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.btn {
    text-align: center;
    padding: 15px;
    background-color: #005F23;
    border: none;
    color: #FFFFFF;
    border-radius: 10px;
    opacity: 60%;
    width: 100%;
    font-size: 22px;
    font-weight: 600;
}

.wrapper {
    position: relative;
    width: 100%;
    background-image: url("/assets/images/background.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    margin: 0;
    padding: 0;
}

.nuxt__links {
    width: 100%;
    padding: 0 80px;
    margin-bottom: 20%;
}

</style>