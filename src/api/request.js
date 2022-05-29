import axios from "axios";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import useDetailStore from '@/store/Detail/index'
import useUserStore from '@/store/User'
import { useRouter } from "vue-router";
// let uuid = localStorage.getItem('UUIDTOKEN')

const requests = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn/api',
    timeout: 5000
})
requests.interceptors.request.use(

    config => {
        const detailStore = useDetailStore()
        const userStore = useUserStore()
        if (detailStore.$state.uuid_token) {
            config.headers.userTempId = detailStore.$state.uuid_token
        }
        if (userStore.$state.token) {
            config.headers.token = userStore.$state.token
        }
        NProgress.start()
        return config
    },
    err => {
        return Promise.reject(new Error(err.message))
    }
)
requests.interceptors.response.use(
    res => {
        // if (res.data.code == "208") {
        //     localStorage.removeItem('token')
        //     const userStore = useUserStore()
        //     userStore.$state.token = ''
        //     return 'false'
        // }
        NProgress.done()
        return res.data
    },
    err => Promise.reject(new Error('faile'))
)
export default requests