export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.query.deleted) return true
    const user = await getCurrentUser()
    const publicPages = ['/', '/singup']
    if (!user && !publicPages.includes(to.path)) {
        return navigateTo('/singup')
    }
})
