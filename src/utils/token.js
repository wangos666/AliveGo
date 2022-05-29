export const getToken = () => {
    let token = localStorage.getItem('token')
    if (token) {
        return token
    } else {
        return ''
    }
}