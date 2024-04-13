<template>
<div class="comment-input-box">
    <Avatar :size="40" class="avatar" :userId="userStore.id"/>
    <div class="input-area"  @click="expand" :style="{maxHeight:expandHeight+'px'}" >
        <textarea ref="textarea" v-model="input"/>
        <Transition>
            <div class="footer" v-show="isExpand">
                <div class="limit">
                    <span>{{input.length}}</span><span>/150</span>
                </div>
                <div class="btn-box">
                   
                    <button class="d-btn" @click.stop="unExpand">取消</button>
                    <button  :class="pBtn" @click="postComment"> 发布</button>
                </div>
             </div>
        </Transition>
    </div>
</div>
</template>

<script setup>
import {ref,watch, nextTick} from 'vue'
import Avatar from './Avatar.vue';
import { useReadingStore } from '@/stores/reading';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
const readingStore = useReadingStore()
const textarea = ref(null)
const isExpand = ref(false)
const expandHeight = ref(40) 
const pBtn = ref('p-btn')
const input = ref('')
function expand(){
    isExpand.value = true
    expandHeight.value = 150
}
function unExpand(){
    isExpand.value = false
    expandHeight.value = 40
}

async function postComment(){
    if(input.value =='')
        return
    readingStore.postComment(input.value)
    input.value=''
    await nextTick()
    textarea.value.style.height = '40px'
}
//输入监听
watch(input, (newInput) => {
    if(newInput.length>0)
        pBtn.value = 'pa-btn'
    else
        pBtn.value = 'p-btn'
    //限制输入长度
    if(newInput.length>150){
        input.value = input.value.slice(0,150)
        return
    }
     //自动调整高度
    textarea.value.style.height = 'auto'
    textarea.value.style.height = textarea.value.scrollHeight +'px'
})
</script>



<style scoped>
.comment-input-box{
    display: flex;
    min-height: 30px;
    align-items: flex-start;
    margin-top: 40px;
    margin-bottom: 80px;
    min-width: 0;
    overflow-y: hidden;;
}
.avatar{
    height: 30px;
    width: 30px;
    margin-right: 10px;
}
.input-area{
    min-width: 0;
    flex-grow: 1;
    max-height: 40px;
    background-color: #5656567e;
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    transition: all 1s ease;
}
.limit{
    font-size: 13px;
    margin-left: 10px;
    color: var(--text-dark-2);
}
textarea{
    width: 100%;
    min-height: 20px;
    max-height: 100px;
    border: none;
    resize: none;
    background-color: #37373700;
    color: var(--text-dark);
    font-size: 14px;
    font-weight: bold;
    font-family: '微软雅黑';
}
textarea:focus{
    outline: none;
}
.footer{
    display: flex;
    justify-content: space-between;
}


.btn-box{
    display: flex;
    justify-content: end;
}
button{
    border: none;
    margin-left: 10px;
    width: 55px;
    height: 30px;
    border-radius: 3px;
    font-size: 10px;
    cursor: pointer;
}
.p-btn{
    background-color: #de9191;
    color: azure;
}
.p-btn:hover{
    background-color: #e79898;
}
.pa-btn{
    background-color: #d44646;
    color: azure;
}
.pa-btn:hover{
    background-color: rgb(234, 70, 70);
}
.d-btn{
    color: var(--text-dark);
    background-color: #8e8e8e86;
}




/* 修改滚动条的样式 */
::-webkit-scrollbar {
    width: 8px; /* 设置滚动条宽度 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    background-color: #838383; /* 滚动条滑块颜色 */
    border-radius: 5px; /* 滚动条滑块圆角 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: #eeeeee00; /* 滚动条轨道颜色 */
}

/* 鼠标悬停在滚动条上的样式 */
::-webkit-scrollbar-thumb:hover {
    background-color: rgb(118, 118, 118)
}
/* 按钮过渡效果 */ 
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;

}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>