<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>活力购欢迎您！</p>
                    <p v-if="!userInfo.name">
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <span>欢迎您 &nbsp;</span>
                        <span>{{ userInfo.name }}</span>
                        <a class="register" @click="outLogin" href="javascript:void(0)">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center">我的订单</router-link>
                    <router-link to="/shopCart">我的购物车</router-link>
                    <a href="###">我的活力购</a>
                    <a href="###">活力购会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注活力购</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" title="活力购" to="/">
                    <img src="./logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form class="searchForm">
                    <input type="text" @keydown.enter.native="goSearch" @submit.native.prevent id="autocomplete"
                        class="input-error input-xxlarge" v-model="keyword" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useHomeStore from '@/store/home'
import { storeToRefs } from 'pinia';
import useUserStore from '@/store/User'
const store = useHomeStore()
const userStore = useUserStore()
let { keyword } = storeToRefs(store)
let { userInfo } = storeToRefs(userStore)
const router = useRouter()
const route = useRoute()
let shopInfo = ref('')
function goSearch() {
    store.changeKeyword(keyword.value)
    router.push({
        name: 'search',
        params: {
            keyword: keyword.value
        },
        query: {
            categoryName: route.query.categoryName || undefined,
            category1Id: route.query.category1Id || undefined,
            category2Id: route.query.category2Id || undefined,
            category3Id: route.query.category3Id || undefined,
            pageNo: 1
        }
    })
}
async function outLogin() {
    try {
        await userStore.outLogin()
        router.push('/home')
    } catch (error) {
        alert(error.message)
    }
}
onMounted(() => {
    userStore.getUserInfo()
})
</script>
<script>
export default {
    name: 'Header',
}
</script>
<style lang="less" scoped>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    a:hover {
                        color: #FF4610;
                    }

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    height: 54px;
                    margin: 20px 18px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #FF4610;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #FF4610;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>