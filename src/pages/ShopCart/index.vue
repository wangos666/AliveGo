<template>
  <TypeNav></TypeNav>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-if="!cartInfoList[0]">
          <div class="empty">
            <div class="item">
              <div class="left">
                <img src="./images/cartEmpty.png" alt="">
              </div>
              <div class="right">
                <div> 购物车空空的哦~，去看看心仪的商品吧~</div><br>
                <router-link to="/home">去购物></router-link>
              </div>
            </div>
          </div>
        </ul>
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked == 1" @change="handleCheck(item)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">官方标配</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('mins', -1, item)">-</a>
            <input autocomplete="off" type="number" :value="item.skuNum" minnum="1" class="itxt"
              @change="handler('change', $event.target.value * 1, item)">
            <a href="javascript:void(0)" class="plus" @click="handler('plus', 1, item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:void(0)" class="sindelet" @click="deleteCart(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="handleAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:void(0)" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ totalChecked }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">¥ {{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useShopcartStore from '@/store/Shopcart'
import useDetailStore from '@/store/Detail'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue';
const store = useShopcartStore()
const detailStore = useDetailStore()
let { cartList, cartInfoList } = storeToRefs(store)
onMounted(() => {
  store.getCartList()
})
let totalPrice = computed(() => {
  let sum = 0
  cartInfoList.value.forEach(element => {
    if (element.isChecked == 1) {
      sum += element.skuPrice * element.skuNum
    }
  })
  return sum
})
let totalChecked = computed(() => {
  let sum = 0
  cartInfoList.value.forEach(element => {
    if (element.isChecked == 1) {
      sum += 1
    }
  })
  return sum
})
let isAllChecked = computed(() => {
  return cartInfoList.value.every(item => item.isChecked == 1)
})
async function handleCheck(item) {
  try {
    await store.updateCheckedById(item.skuId, 1 - item.isChecked)
    store.getCartList()
  } catch (error) {
    alert(error.message)
  }
}
async function handler(type, disNum, cart) {
  switch (type) {
    case 'plus':
      disNum = 1
      break
    case 'mins':
      disNum = cart.skuNum > 1 ? -1 : 0
      break
    case 'change':
      disNum = (isNaN(disNum) || disNum < 1) ? 0 : parseInt(disNum) - cart.skuNum
      break
  }
  try {
    await detailStore.addOrUpdateShopCar(cart.skuId, disNum)
    store.getCartList()
  } catch (error) {
    alert(error.message)
  }
}
async function deleteCart(skuId) {
  try {
    await store.deleteCartById(skuId)
    store.getCartList()
  } catch (error) {
    alert(error.message)
  }
}
async function deleteAllChecked() {
  try {
    await store.deleteAllCheckedCart()
    store.getCartList()
  } catch (error) {
    alert(error.message)
  }
}
async function handleAllChecked() {
  let isChecked = 1 - isAllChecked.value
  try {
    await store.updateAllChecked(isChecked)
    store.getCartList()
  } catch (error) {
    alert(error.message)
  }
}
</script>
<script>
export default {
  name: 'ShopCart',
}
</script>

<style lang="less" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
  outline: none;
}

.empty {
  margin: 0 auto;

  .item {
    margin: 0 500px;

    .left {
      float: left !important;
    }

    .right {
      float: left;

      div {
        width: 300px;
        font-size: 16px;
        margin-left: -120px;
      }

      a {
        font-size: 13px;
      }

      a:hover {
        color: #FF4610;
      }
    }
  }
}

.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 30%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 230px;
            margin: 0 20px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 15.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;

        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }

          a:hover {
            color: #FF4610;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    margin-bottom: 10px;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;
      line-height: 34px;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      line-height: 34px;
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 54px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 50px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #FF4610;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 54px;
          line-height: 54px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #FF4610;
          overflow: hidden;
        }
      }
    }
  }
}
</style>