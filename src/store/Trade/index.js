import { defineStore } from "pinia";
import { reqAddressInfo, reqOrderInfo, reqSubmitOrder, reqPayInfo, reqPayStatus } from "@/api";
import QRCode from 'qrcode'
export default defineStore('trade', {
    state: () => {
        return {
            address: [],
            OrderInfo: {},
            orderId: '',
            payInfo: {},
            vxUrl: '',
            payStatus: '',
        }
    },
    getters: {

    },
    actions: {
        getAddress() {
            reqAddressInfo().then(
                res => this.address = res.data
            )
        },
        getOrderInfo() {
            reqOrderInfo().then(
                res => this.OrderInfo = res.data
            )
        },
        async submitOrder(tradeNo, data) {
            let result = await reqSubmitOrder(tradeNo, data)
            if (result.code == 200) {
                this.orderId = result.data
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        getPayInfo(orderId) {
            reqPayInfo(orderId).then(
                res => {
                    this.payInfo = res.data
                    QRCode.toDataURL(res.data.codeUrl)
                        .then(url => {
                            this.vxUrl = url
                        })
                }
            )
        },
        getPayStatus(orderId) {
            reqPayStatus(orderId).then(
                res => this.payStatus = res.code
            )
        }
    }
})