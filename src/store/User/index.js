import { defineStore } from "pinia";
import { reqGetCode, reqRegister, reqLogin, reqGetUserInfo, reqLogOut } from "@/api";
import { getToken } from "@/utils/token";
export default defineStore('user', {
    state: () => {
        return {
            code: '',
            token: getToken(),
            userInfo: {}
        }
    },
    getters: {
        name() {
            return this.userInfo.name
        }
    },
    actions: {
        getCode(phone) {
            reqGetCode(phone).then(
                res => this.code = res.data
            )
        },
        async register(params) {
            let result = await reqRegister(params)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        async login(params) {
            let result = await reqLogin(params)
            if (result.code == 200) {
                this.token = result.data.token
                localStorage.setItem('token', result.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        async getUserInfo() {
            let result = await reqGetUserInfo()
            if (result.code == 200) {
                this.userInfo = result.data
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        async outLogin() {
            let result = await reqLogOut()
            if (result.code == 200) {
                localStorage.removeItem('token')
                this.userInfo = {}
                this.token = ''
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }

        }
    }
})