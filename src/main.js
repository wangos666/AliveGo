import { createApp } from 'vue'
import App from './App.vue'
import '@/style/reset.css'
import TypeNav from '@/components/TypeNav'
import router from '@/router'
import { createPinia } from 'pinia'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import Pagenation from '@/components/Pagenation'
import useUserStore from '@/store/User'
import 'element-plus/dist/index.css'
import lazyPlugin from 'vue3-lazy'
const app = createApp(App);
app.component('TypeNav', TypeNav)
app.component('Pagenation', Pagenation)
app.use(createPinia())
app.use(lazyPlugin, {
    loading: require('@/assets/lazyLoad.png'), // 图片加载时默认图片
    error: require('@/assets/lazyLoad.png')// 图片加载失败时默认图片
})
app.use(router)
app.mount('#app')