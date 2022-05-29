<template>
    <div class="floor" v-for="item1 in floorList">
        <div class="py-container">
            <div class="title clearfix">
                <h3 class="fl">{{ item1.name }}</h3>
                <div class="fr">
                    <ul class="nav-tabs clearfix">
                        <li class="active" v-for="tab in item1.navList">
                            <a :href="tab.url" data-toggle="tab">{{ tab.text }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-pane">
                    <div class="floor-1">
                        <div class="blockgary">
                            <ul class="jd-list">
                                <li v-for="item2 in item1.keywords">{{ item2 }}</li>
                            </ul>
                            <img :src="item1.imgUrl" />
                        </div>
                        <div class="floorBanner">
                            <div class="swiper-container" id="floor1Swiper" ref="swipercontainer">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="carouse in item1.carouselList">
                                        <img :src="carouse.imgUrl">
                                    </div>
                                </div>
                                <!-- 如果需要分页器 -->
                                <div class="swiper-pagination"></div>

                                <!-- 如果需要导航按钮 -->
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>
                            </div>
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit" v-for="pic in item1.recommendListLeft">
                                <img :src="pic" />
                            </div>
                        </div>
                        <div class="split center">
                            <img :src="item1.bigImg" />
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit" v-for="pic in item1.recommendListRight">
                                <img :src="pic" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import useHomeStore from '@/store/home'
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, ref, watch } from 'vue';
import Swiper from 'swiper'
const store = useHomeStore()
const swipercontainer = ref(null)
let { floorList } = storeToRefs(store)
onMounted(() => {
    store.getFloorList()
    watch(floorList, () => {
        nextTick(() => {
            new Swiper(swipercontainer.value, {
                autoplay: true,
                direction: "horizontal", // 垂直切换选项
                loop: true, // 循环模式选项

                // 如果需要分页器
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },

                // 如果需要滚动条
                scrollbar: {
                    el: ".swiper-scrollbar",
                },
            });
        })
    })
})
</script>

<style scoped lang="less">
.floor {
    margin-top: 15px;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .title {
            .fl {
                float: left;
                color: #FF4610;
                font-size: 20px;
                line-height: 30px;
                margin: 9px 0;
                font-weight: 700;
            }

            .fr {
                float: right;

                .nav-tabs {
                    margin: 10px 0 0;
                    display: inline-block;

                    li {
                        float: left;
                        line-height: 18px;

                        a {
                            padding-top: 1px;
                            font-weight: 400;
                            background-color: #fff;

                            &::after {
                                content: "|";
                                padding: 0 10px;
                            }
                        }

                        &:nth-child(7) {
                            a {
                                &::after {
                                    content: "";
                                }
                            }
                        }

                        &.active {
                            a {
                                color: #FF4610;
                            }
                        }
                    }
                }
            }
        }

        .tab-content {
            border-top: 2px solid #FF4610;
            border-bottom: 1px solid #e4e4e4;

            .tab-pane {
                .floor-1 {
                    height: 360px;
                    display: flex;

                    .blockgary {
                        width: 210px;
                        height: 100%;
                        background: #f7f7f7;

                        .jd-list {
                            padding: 15px 0;
                            overflow: hidden;

                            li {
                                list-style-type: none;
                                float: left;
                                width: 40%;
                                margin: 0 10px;
                                border-bottom: 1px solid #e4e4e4;
                                text-align: center;
                                line-height: 26px;
                            }
                        }

                        img {
                            width: 100%;
                        }
                    }

                    .floorBanner {
                        width: 330px;
                        height: 100%;
                    }

                    .split {
                        width: 220px;
                        height: 100%;
                        position: relative;

                        .floor-x-line {
                            position: absolute;
                            background: #e4e4e4;
                            width: 220px;
                            height: 1px;
                            top: 180px;
                        }

                        .floor-conver-pit {
                            width: 100%;
                            height: 50%;

                            img {
                                width: 100%;
                                height: 100%;
                                transition: all 400ms;

                                &:hover {
                                    opacity: 0.8;
                                }
                            }
                        }
                    }

                    .center {
                        border: 1px solid #e4e4e4;
                    }
                }
            }
        }
    }
}
</style>