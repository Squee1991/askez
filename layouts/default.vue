<template>
    <div class="layout">
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
// export default {
// 	components: {
// 		Header , Footer
// 	},
// };

const user = useCurrentUser()
const router = useRouter()
const route = useRoute()

// Запускаем код только на клиенте (не на сервере)
onMounted(() => {
    watch(user, (user, prevUser) => {
        if (prevUser && !user) {
            // Пользователь вышел из системы → перенаправляем на /login
            router.push('/singup')
        } else if (user && typeof route.query.redirect === 'string') {
            // Пользователь вошел в систему → перенаправляем на страницу, с которой он пришел
            router.push(route.query.redirect)
        }
    })
})
</script>


<style>

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

a {
    text-decoration: none;
    display: flex;
    align-items: center;
}

li {
    list-style-type: none;
}

.container {
    width: 100%;
    margin: 0 auto;

}
</style>