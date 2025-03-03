export const useCurrentUser = () => {
    return useState('user', () => null) // Здесь можно загрузить пользователя из API или хранилища
}