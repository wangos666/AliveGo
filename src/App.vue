<template>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="route.meta.isShow"></Footer>
</template>

<script setup>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue-demi'
import useHomeStore from '@/store/home'
import useUserStore from '@/store/User'

const store = useHomeStore()
let route = useRoute()
const userStore = useUserStore()

onMounted(() => {
  store.getCategoryList()
})
</script>

<style>
a {
  text-decoration: none !important;
}
</style>
