export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await getCurrentUser()

    // Избегаем бесконечного редиректа, проверяя, что не перенаправляем на ту же страницу
    if (!user && to.path !== '/singup') {
        return navigateTo({ path: '/singup' })
    }
})