// export default defineNuxtRouteMiddleware(async (to, from) => {
//     const user = await getCurrentUser()
//
//     if (!user) {
//         return navigateTo({
//             path: '/singup',
//             query: { redirect: to.fullPath },
//         })
//     }
// })
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token') || null; // Проверяем токен в куках

    if (!token) {
        return navigateTo('/singin'); // Если нет токена, перенаправляем на логин
    }
});