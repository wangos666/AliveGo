import { defineStore } from "pinia";
import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
export default defineStore('shopcart', {
    state: () => {
        return {
            cartList: []
        }
    },
    getters: {
        cartInfoList() {
            let res = this.cartList[0] !== undefined ? this.cartList[0].cartInfoList : []
            return res
        }
    },
    actions: {
        getCartList() {
            reqGetCartList().then(
                res => {
                    this.cartList = res.data
                }
            )
        },
        async deleteCartById(skuId) {
            let result = await reqDeleteCartById(skuId)
            if (result.code == 200) {
                return 'ok'
            } else {
                Promise.reject(new Error('faile'))
            }
        },
        async updateCheckedById(skuId, isChecked) {
            let result = await reqUpdateCheckedById(skuId, isChecked)
            if (result.code == 200) {
                return 'ok'
            } else {
                Promise.reject(new Error('faile'))
            }
        },
        deleteAllCheckedCart() {
            let promiseAll = []
            this.cartInfoList.forEach(element => {
                if (element.isChecked === 1) {
                    let promise = this.deleteCartById(element.skuId)
                    promiseAll.push(promise)
                }
            })
            return Promise.all(promiseAll)
        },
        updateAllChecked(isChecked) {
            let promiseAll = []
            this.cartInfoList.forEach(element => {
                if (element.isChecked !== isChecked) {
                    let promise = this.updateCheckedById(element.skuId, isChecked)
                    promiseAll.push(promise)
                }
            })
            return Promise.all(promiseAll)
        }
    }

})