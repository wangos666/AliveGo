<template>
    <div class="pagination">
        <button :disabled="pageNo === 1" @click="goBack">上一页</button>
        <button v-if="startNumAndEndNum[0] > 1" @click="handlePage(1)">1</button>
        <button v-if="startNumAndEndNum[0] > 2">···</button>

        <button v-for="(page, index) in startNumAndEndNum" :key="index" @click="handlePage(page)"
            :class="{ 'active': pageNo === page }">{{ page }}</button>


        <button v-if="startNumAndEndNum[startNumAndEndNum.length - 1] < totalPages">···</button>
        <button v-if="startNumAndEndNum[startNumAndEndNum.length - 1] < totalPages" @click="handlePage(totalPages)">{{
                totalPages
        }}</button>
        <button :disabled="pageNo === totalPages" @click="goNext">下一页</button>
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps(['continues', 'totalPages', 'total', 'pageNo'])
const emit = defineEmits(['handlePage', 'goBack', 'goNext'])
let startNumAndEndNum = computed(() => {
    let start = 0, end = 0
    let numArr = []
    if (props.continues > props.totalPages) {
        start = 1
        end = props.totalPages
    }
    else {
        start = props.pageNo - parseInt(props.continues / 2)
        end = props.pageNo + parseInt(props.continues / 2)
        if (start < 1) {
            start = 1
            end = props.continues
        } else if (end > props.totalPages) {
            start = props.totalPages - props.continues + 1
            end = props.totalPages
        }
    }
    let i
    for (i = start; i <= end; i++) {
        numArr.push(i)
    }
    return numArr
})
function handlePage(pageNo) {
    emit('handlePage', pageNo)
}
function goBack() {
    emit('goBack')
}
function goNext() {
    emit('goNext')
}
</script>
<script>
export default {
    name: 'pageNation'
}
</script>

<style scoped lang="less">
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #FF4610;
            color: #fff;
        }
    }
}
</style>