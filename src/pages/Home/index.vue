<template>
    <!-- 项目的最外层 -->
    <div class="outer">
        <!-- 商品分类导航 -->
        <TypeNav></TypeNav>
        <!--列表-->
        <ListContainer></ListContainer>
        <!--今日推荐-->
        <Recommend></Recommend>
        <!-- 商品排行 -->
        <Rank></Rank>
        <!-- 猜你喜欢 -->
        <Like></Like>
        <!--楼层-->
        <Floor></Floor>
        <!--商标-->
        <Brand></Brand>
    </div>
</template>
<script setup>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand/'
import useUserStore from '@/store/User'
import { onMounted } from 'vue'
const userStore = useUserStore()
onMounted(() => {
    userStore.getUserInfo()
})
</script>

<style lang="less" scoped>
</style>