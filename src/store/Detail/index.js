import { defineStore } from "pinia";
import { reqGetDetailInfo, reqAddOrUpdateShopCar } from "@/api";
import { getUUID } from "@/utils/uuid_token";
export default defineStore('detail', {
    state: () => {
        return {
            detailInfo: {},
            imgIndex: 0,
            uuid_token: getUUID(),
        }
    },
    getters: {
        skuInfo() {
            return this.detailInfo.skuInfo || {}
        },
        categoryView() {
            return this.detailInfo.categoryView || {}
        },
        spuSaleAttrList() {
            return this.detailInfo.spuSaleAttrList || {}
        },
    },
    actions: {
        getDetailInfo(skuId) {
            reqGetDetailInfo(skuId).then(
                res => this.detailInfo = res.data
            )
        },
        getImgIndex(index) {
            this.imgIndex = index
        },
        async addOrUpdateShopCar(skuId, skuNum) {
            let result = await reqAddOrUpdateShopCar(skuId, skuNum)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    }
})