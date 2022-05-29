export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: {
            isShow: true,
            title: '活力GO! 年轻人的购物平台',
            needLogin: false,
        },
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        props: true,
        meta: {
            isShow: true,
            title: '活力GO! 商品搜索',
            needLogin: false,
        },
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {
            isShow: false,
            title: '活力GO! 登录',
            needLogin: false,
        },
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: {
            isShow: false,
            title: '活力GO! 新用户注册',
            needLogin: false,
        },
    },
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: () => import('@/pages/Detail'),
        meta: {
            isShow: true,
            title: '活力GO! 商品详情',
            needLogin: false,
        },
    },
    {
        name: 'AddCartSuccess',
        path: '/addCartSuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: {
            isShow: true,
            title: '活力GO! 成功添加到购物车',
            needLogin: false,
        },
    },
    {
        name: 'ShopCart',
        path: '/shopCart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            isShow: true,
            title: '活力GO! 我的购物车',
            needLogin: false,
        },
    },
    {
        name: 'Trade',
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: {
            isShow: true,
            title: '活力GO! 结算页',
            needLogin: true,
        },
    },
    {
        name: 'Pay',
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            isShow: true,
            title: '活力GO! 在线支付',
            needLogin: true,
        },
    },
    {
        name: 'PaySuccess',
        path: '/paySuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            isShow: true,
            title: '活力GO! 支付成功页',
            needLogin: true,
        },
    },
    {
        name: 'Center',
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: {
            isShow: true,
            title: '活力GO! 个人中心',
            needLogin: true,
        },
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/MyOrder'),
                meta: {
                    needLogin: true,
                },
            },
            {
                path: 'groupOrder',
                component: () => import('@/pages/Center/GroupOrder'),
                meta: {
                    needLogin: true,
                },
            },
            {
                path: '/center',
                redirect: '/center/myorder',
                meta: {
                    needLogin: true,
                },
            }
        ]
    }
]