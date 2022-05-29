import { createWebHistory, createRouter } from 'vue-router'
import routes from './routes'
import useUserStore from '@/store/User'
import { storeToRefs } from 'pinia';
const history = createWebHistory();
const router = createRouter({
    history,
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    },
})
router.beforeEach(async (to, from, next) => {
    const store = useUserStore()
    let name = store.$state.userInfo?.name
    if (store.$state.token) {
        if (to.path === '/login') {
            if (to.meta.title) {
                document.title = to.meta.title
            }
            next('/')
        } else {
            if (name) {
                if (to.meta.title) {
                    document.title = to.meta.title
                }
                next()
            } else {
                try {
                    await store.getUserInfo()
                    if (to.meta.title) {
                        document.title = to.meta.title
                    }
                    next()
                } catch (error) {
                    await store.outLogin()
                    if (to.meta.title) {
                        document.title = to.meta.title
                    }
                    next('/login')
                }
            }

        }
    } else {
        if (to.meta.needLogin) {
            next('/login?redirect=' + to.path)
        } else {
            if (to.meta.title) {
                document.title = to.meta.title
            }
            next()
        }

    }


})
export default router
