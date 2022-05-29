import { defineStore } from "pinia";
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api/index'
export default defineStore('main', {
    state: () => {
        return {
            categoryList: [],
            bannerList: [],
            floorList: [],
            keyword: ''
            // count: 10,
            // list: [{
            //     name: 'iphone',
            //     price: 1000
            // }],
            // timuList: []
        }
    },
    getters: {
        // sumPrice: (state) => {
        //     return state.list.reduce((pre, item) => {
        //         return pre + (item.price)
        //     }, 0)
        // },
        // sumPrice() {
        //     return this.list.reduce((pre, item) => {
        //         return pre + (item.price)
        //     }, 0)
        // }
    },
    actions: {
        // async getTimu() {
        //     let result = await axios.get('/timu.json')
        //     this.timuList = result.data
        // }
        getCategoryList() {
            reqCategoryList().then(
                res => this.categoryList = res.data
            )
        },
        getBannerList() {
            reqGetBannerList().then(
                res => this.bannerList = res.data
            )
        },
        getFloorList() {
            reqGetFloorList().then(
                res => this.floorList = res.data
            )
        },
        changeKeyword(key) {
            this.keyword = key
        }
    }
})