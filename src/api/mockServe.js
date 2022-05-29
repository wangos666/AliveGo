import axios from "axios";
const mock = axios.create({
    baseURL: '/mock',
    timeout: 5000
})
mock.interceptors.request.use(
    config => config
)
mock.interceptors.response.use(
    res => res.data,
    err => Promise.reject(new Error('faile'))
)
export default mock