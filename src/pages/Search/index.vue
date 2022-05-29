<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="urlInfo.categoryName" @click="removeCategoryName">{{ urlInfo.categoryName
            }}<i>×</i></li>
            <li class="with-x" v-if="urlInfo.keyword" @click="removeKeyword">{{ urlInfo.keyword
            }}<i>×</i></li>
            <li class="with-x" v-if="urlInfo.trademark" @click="removeTrademark">{{ urlInfo.trademark.split(':')[1]
            }}<i>×</i></li>
            <li class="with-x" @click="removeProps(item)" v-for="item in urlInfo.props">
              {{ item.split(':')[1] }}<i>×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo='trademarkInfo' @attrInfo='attrInfo' />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="handleOrder('1:desc')">
                  <a href="javascript:void(0);">综合</a>
                </li>
                <li :class="{ active: urlInfo.order.indexOf('1:asc') !== -1 }" @click="handleOrder('1:asc')">
                  <a href="javascript:void(0);">销量</a>
                </li>
                <li :class="{ active: urlInfo.order.indexOf('2:asc') !== -1 }" @click="handleOrder('2:asc')">
                  <a href="javascript:void(0);">价格⬆</a>
                </li>
                <li :class="{ active: urlInfo.order.indexOf('2:desc') !== -1 }" @click="handleOrder('2:desc')">
                  <a href="javascript:void(0);">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`"><img v-lazy="item.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i> {{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${item.id}`" :title="item.title">
                      <span v-html='item.title'></span>
                    </router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagenation :continues="5" :totalPages="SearchInfo.totalPages" :pageNo="SearchInfo.pageNo"
            :total="SearchInfo.total" @handlePage="handlePage" @goBack="goBack" @goNext="goNext"></Pagenation>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchSelector from './SearchSelector/SearchSelector.vue';
import useHomeStore from '@/store/home'
import useSearchStore from '@/store/Search'
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
const homeStore = useHomeStore()
const route = useRoute()
const router = useRouter()
const store = useSearchStore()
const { SearchInfo, goodsList } = storeToRefs(store)
let urlInfo = reactive({
  keyword: '',
  categoryName: '',
  category1Id: '',
  category2Id: '',
  category3Id: '',
  order: '1:desc',
  pageNo: 1,
  pageSize: 10,
  totalPages: '',
  props: [],
  trademark: ""
})
Object.assign(urlInfo, route.params, route.query)
onMounted(() => {
  store.getSearchInfo(urlInfo)
})
watch(route, () => {
  urlInfo.category1Id = ''
  urlInfo.category2Id = ''
  urlInfo.category3Id = ''
  Object.assign(urlInfo, route.params, route.query)
  store.getSearchInfo(urlInfo)
})
let isOne = computed(() => {
  return urlInfo.order.indexOf('1:desc') !== -1
})
function removeCategoryName() {
  urlInfo.categoryName = ''
  urlInfo.category1Id = ''
  urlInfo.category2Id = ''
  urlInfo.category3Id = ''
  router.push({
    name: 'search',
    params: {
      keyword: route.params.keyword || undefined
    },
    query: {
      trademark: urlInfo.trademark || undefined,
      pageNo: 1
    }
  })
  // store.getSearchInfo(urlInfo)
}
function removeKeyword() {
  urlInfo.keyword = ''
  homeStore.changeKeyword('')
  router.push({
    name: 'search',
    query: {
      categoryName: route.query.categoryName || undefined,
      category1Id: route.query.category1Id || undefined,
      category2Id: route.query.category2Id || undefined,
      category3Id: route.query.category3Id || undefined,
      trademark: urlInfo.trademark || undefined,
      pageNo: 1
    }
  })
}
function trademarkInfo(trademark) {
  urlInfo.trademark = `${trademark.tmId}:${trademark.tmName}`
  router.push({
    name: 'search',
    params: {
      keyword: route.params.keyword || undefined
    },
    query: {
      categoryName: route.query.categoryName || undefined,
      category1Id: route.query.category1Id || undefined,
      category2Id: route.query.category2Id || undefined,
      category3Id: route.query.category3Id || undefined,
      trademark: urlInfo.trademark,
      pageNo: 1
    }
  })
}
function removeTrademark() {
  urlInfo.trademark = ''
  router.push({
    name: 'search',
    params: {
      keyword: route.params.keyword || undefined
    },
    query: {
      categoryName: route.query.categoryName || undefined,
      category1Id: route.query.category1Id || undefined,
      category2Id: route.query.category2Id || undefined,
      category3Id: route.query.category3Id || undefined,
      trademark: undefined,
      pageNo: 1
    }
  })
}
function attrInfo(attr, attrValue) {
  let result = `${attr.attrId}:${attrValue}:${attr.attrName}`
  if (urlInfo.props.indexOf(result) == -1) {
    urlInfo.props.push(result)
    urlInfo.pageNo = 1
    store.getSearchInfo(urlInfo)
  }
}
function removeProps(item) {
  urlInfo.pageNo = 1
  urlInfo.props = urlInfo.props.filter(data => {
    return data !== item
  })
  store.getSearchInfo(urlInfo)
}
function handleOrder(order) {
  urlInfo.pageNo = 1
  urlInfo.order = order
  store.getSearchInfo(urlInfo)
}
function handlePage(num) {
  urlInfo.pageNo = num
  store.getSearchInfo(urlInfo)
}
function goBack() {
  urlInfo.pageNo = urlInfo.pageNo - 1
  store.getSearchInfo(urlInfo)
}
function goNext() {
  urlInfo.pageNo = urlInfo.pageNo + 1
  store.getSearchInfo(urlInfo)
}
</script>
<script>
export default {
  name: 'Search',
}
</script>
<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #FF4610;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    width: 215px;
                    height: 215px;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #FF4610;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #FF4610;
                  color: #FF4610;

                  &:hover {
                    border: 1px solid #FF4610;
                    background-color: #FF4610;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>