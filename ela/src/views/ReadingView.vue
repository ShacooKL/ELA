<template>

<div class="r-box">
    <div class="main">


    </div>
    <div class="comment" v-if="commentShow">
        <div class="c-box">
            <div class="c-top">
                <div class="word">
                    评论
                </div>
                <div class="comments-num ">
                    <span>{{ commentsNum }}</span><span>条评论</span>
                </div>
                
            </div>
            <div class="c-comments">
                <Comment/><Comment/><Comment/><Comment/><Comment/><Comment/><Comment/><Comment/><Comment/><Comment/><Comment/><Comment/>
            </div>
            <div class="c-bottom">
                <CommentInput class="comment-input"/>
            </div>

        </div>
    </div>
    <div class="side-bar" @click="commentsShowChange" :style="{right:sideBarR}">

    </div>

</div>

</template>

<script setup>
import {ref,computed} from 'vue'
import Comment from '@/components/Comment.vue'
import CommentInput from '@/components/CommentInput.vue'
const commentShow = ref(false)
const mainWidth = ref(60)
const commentWidth = ref(0)
const commentsNum = ref(999)

const sideBarR = computed(()=>{
    return 'calc( '+ (100-mainWidth.value)/2 + '% - 70px - ' + commentWidth.value/2 +'px )'
})
function commentsShowChange(){
    commentShow.value = !commentShow.value
    if(commentWidth.value==0)
        commentWidth.value=300
    else
        commentWidth.value=0
}
</script>

<style scoped>
.r-box{
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    min-height: 100%;
    
}
.main{
    min-height: 1000px;
    width: 60%;
    background-color: #c05e5e88;
}
.side-bar{
    position: fixed;
    right: 200px;
    top: 15%;
    width: 70px;
    min-height: 50%;
    background-color: #237389;
}
.comment{
    width: 300px;
    height: 100px;
    background-color: #318d5700;
}
.c-box{
    position: fixed;
    height: 100%;
    width: 300px;
    background-color: #9fad219c;
    display: flex;
    flex-direction: column;
}
.c-top{
    min-height: 100px;
    width: 300px;
    background-color: #b93ac456;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: space-between;
}
.c-comments{
    flex-grow: 1;
    width: 300px;
    background-color: #b75454;
    overflow-y: scroll;
    overflow-x: visible;
}
.c-bottom{
    min-height: 100px;
    width: 300px;
    background-color: #96b32256;
    display: flex;
    align-items: center;
    justify-content: center;
}
.word{
    font-size: 30px;
    color: rgb(0, 0, 0);
    margin-left: 10px;
}
.comments-num{
    margin-right: 10px;
}
.comment-input{
    width: 80%;
    min-height: 30px;
}

</style>