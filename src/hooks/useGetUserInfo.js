export const useGetUserInfo = () => {
    const { name, email, photo, isAuth, userId } = JSON.parse(localStorage.getItem('user'));

    return { name, email, photo, isAuth, userId };
}