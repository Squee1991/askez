export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await getCurrentUser()
    if (!user && to.path !== '/singup') {
        return navigateTo('singup')
    }
})