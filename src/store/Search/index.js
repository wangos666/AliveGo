import { defineStore } from "pinia";
import { reqGetSearchInfo } from "@/api";
export default defineStore('search', {
    state: () => {
        return {
            SearchInfo: {}
        }
    },
    getters: {
        goodsList() {
            return this.SearchInfo.goodsList || []
        },
        attrsList() {
            return this.SearchInfo.attrsList || []
        },
        trademarkList() {
            return this.SearchInfo.trademarkList || []
        }
    },
    actions: {
        getSearchInfo(params = {}) {
            reqGetSearchInfo(params).then(
                res => this.SearchInfo = res.data
            )
        }
    }
})