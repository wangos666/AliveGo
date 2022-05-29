<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="isShow">
                        <div class="all-sort-list2" @click="goSearch">
                            <div v-for="(c1, index) in categoryList" class="item"
                                :class="{ cur: currentIndex === index }">
                                <h3 @mouseenter="changeCurrentIndex(index)">
                                    <a href="javascript:;" :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId">{{
                                                c1.categoryName
                                        }}</a>
                                </h3>
                                <div class="item-list clearfix">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="index">
                                        <dl class="fore">
                                            <dt>
                                                <a href="javascript:;" :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{
                                                            c2.categoryName
                                                    }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="index">
                                                    <a href="javascript:;" :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{
                                                                c3.categoryName
                                                        }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">活力购超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script setup>
import useHomeStore from "@/store/home";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
let currentIndex = ref(-2);
let isShow = ref(true);
function changeCurrentIndex(index) {
    currentIndex.value = index;
}
function leaveShow() {
    currentIndex.value = -2;
    if (route.path !== '/home') {
        isShow.value = false
    }
}
function goSearch(event) {
    let element = event.target
    let { categoryname, category1id, category2id, category3id } = element.dataset
    if (categoryname) {
        let location = { name: 'search' }
        location.params = route.params
        location.query = {
            categoryName: categoryname,
            trademark: route.query.trademark || undefined,
        }
        if (category1id) {
            location.query.category1Id = category1id
        } else if (category2id) {
            location.query.category2Id = category2id
        } else {
            location.query.category3Id = category3id
        }
        router.push(location)
    }
}
function enterShow() {
    isShow.value = true
}
const store = useHomeStore();
const { categoryList } = storeToRefs(store);
onMounted(() => {
    if (route.path !== '/home') {
        isShow.value = false
    }
});
</script>

<script>
export default {
    name: 'TypeNav',
}
</script>
<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #FF4610;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #FF4610;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            a:hover {
                text-decoration: none;
                color: #c81623 !important;
            }

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 27px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }

                .cur {
                    background-color: #d9d9d9;

                    h3 {
                        a {
                            color: #c81623 !important;
                            text-decoration: none;
                        }
                    }
                }
            }
        }

        .sort-enter-from,
        .sort-leave-to {
            opacity: 0;
        }

        /* 离开和进入过程中的样式 */
        .sort-enter-active,
        .sort-leave-active {
            /* 添加过渡动画 */
            transition: all 0.5s ease;
        }

        /* 进入之后和离开之前的样式 */
        .sort-enter-to,
        .sort-leave-from {
            opacity: 1;
        }
    }
}
</style>
