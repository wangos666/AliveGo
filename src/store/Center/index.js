import { defineStore } from "pinia";
import { reqMyOrder } from "@/api";
export default defineStore('center', {
    state: () => {
        return {
            MyOrderList: {}
        }
    },
    getters: {
        records() {
            return this.MyOrderList.records
        }
    },
    actions: {
        getMyOrder(page, limit) {
            reqMyOrder(page, limit).then(
                res => this.MyOrderList = res.data
            )
        }
    }
})