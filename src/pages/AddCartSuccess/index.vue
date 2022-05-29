<template>
  <TypeNav></TypeNav>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><i class="myicon-tick-checked"></i>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="skuInfo.skuDefaultImg">
          </div>
          <div class="right-info">
            <p class="title">{{ skuInfo.skuName }}</p>
            <p class="attr">{{ skuInfo.skuDesc }} </p>
            <p class="attr">数量：{{ route.query.skuNum }}件</p>
          </div>
        </div>

      </div>
    </div>
    <div class="right-gocart">
      <router-link :to="`/detail/${skuInfo.id}`" class="sui-btn btn-xlarge" @click="goBack">查看商品详情</router-link>
      <router-link to="/shopCart" class="pay">去购物车结算 > </router-link>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const skuInfo = computed(() => {
  return JSON.parse(sessionStorage.getItem('addCar'))
})
function goBack() {
  router.back()
}
</script>
<script>
export default {
  name: 'AddCartSuccess',
}
</script>

<style lang="less" scoped>
.cart-complete-wrap {
  position: relative;
  background-color: #f4f4f4;
  height: 270px;

  .right-gocart {
    position: absolute;
    bottom: 30px;
    right: 30px;


    a {
      padding: 7px 36px;
      font-size: 15px;
      line-height: 22px;
      color: #333;
      background-color: #eee;
      text-decoration: none;
      box-sizing: border-box;
      border: 1px solid #e1e1e1;
    }

    .pay {
      background-color: #FF4610;
      color: white;
      margin-left: 10px;
    }

    a:hover {
      background-color: #f7f7f7;
      border: 1px solid #eaeaea;
    }

    .pay:hover {
      background-color: #f25120
    }

    a:active {
      background-color: #e1e1e1;
      border: 1px solid #d5d5d5;
    }

    .btn-danger {
      background-color: #e1251b;
      color: #fff;
    }

    .btn-danger:hover {
      background-color: #e1251b;
    }
  }

  .cart-complete {
    width: 1200px;
    margin: 0 auto;

    h3 {
      font-weight: 400;
      font-size: 16px;
      color: #6aaf04;
      padding-top: 15px;
      padding-bottom: 15px;
      margin: 0;

      .icon-pc-right {
        background-color: #fff;
        border: 2px solid #6aaf04;
        padding: 3px;
        margin-right: 8px;
        border-radius: 15px;
      }
    }

    .goods {
      overflow: hidden;
      padding: 10px 0;

      .left-good {
        float: left;

        .left-pic {
          border: 1px solid #dfdfdf;
          width: 100px;
          height: 100px;
          float: left;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .right-info {
          color: #444;
          float: left;
          margin-left: 10px;
          margin-top: 20px;

          .title {
            width: 100%;
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
          }

          .attr {
            color: #aaa;
          }
        }
      }

    }
  }
}
</style>