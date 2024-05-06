<template>

<div class="comment-box">
    <div class="avatar">
        <Avatar :size="30" :userId="userId"/>
    </div>
    <div class="main" @mouseover="dislikeShow=true" @mouseout="dislikeShow=false">
        <div class="username">
            {{ userName }}
        </div>
        <div class="content"  >
            {{ content }}    
        </div> 
        
        <div class="footer">
           <div class="floor">12楼</div>
            
             <div class="text">2024/4/9 23:052024/4/9 23:052024/4/9 23:052024/4/9 23:052024/4/9 23:05</div>
            
             <div class="btn" style="margin-right: 15px;">
                <span v-show="dislikeShow">踩</span>
                <svg v-show="dislikeShow" class="icon disLike"  viewBox="0 0 1105 1024" ><path d="M1105.482847 538.795736L992.604812 50.860742A65.626764 65.626764 0 0 0 928.618717 0H346.509316a32.813382 32.813382 0 0 0-32.813382 32.813382v670.049265a32.813382 32.813382 0 0 0 32.813382 32.813382h103.690288c72.189441 48.235672 88.924266 146.347685 91.221203 160.785573 12.140951 82.689723 48.563806 131.253529 98.440146 127.315923a98.440147 98.440147 0 0 0 70.220638-32.813382 194.91149 194.91149 0 0 0 32.813382-131.253529l-17.062958-122.722049h182.770539a196.880293 196.880293 0 0 0 196.880293-198.192829z m-65.626764 6.89081a131.253529 131.253529 0 0 1-131.253529 124.362719h-193.927089a436.417984 436.417984 0 0 0-58.079687 0c-6.234543 0-4.593874 12.140951-3.609472 18.703628l6.562677 46.923136 18.375494 131.253529a133.222332 133.222332 0 0 1-17.391093 81.049054 32.813382 32.813382 0 0 1-23.953769 11.15655c-6.89081 0-23.625635-22.969368-30.516445-71.205039a328.133822 328.133822 0 0 0-62.67356-151.269692 241.834627 241.834627 0 0 0-68.579969-61.361025 32.813382 32.813382 0 0 0-17.062959-4.26574h-78.752117V65.626764H928.618717zM242.162761 668.080462V65.626764a65.626764 65.626764 0 0 0-65.626765-65.626764H65.626764a65.626764 65.626764 0 0 0-65.626764 65.626764v602.453698a65.626764 65.626764 0 0 0 65.626764 65.626764h110.909232a65.626764 65.626764 0 0 0 65.626765-65.626764z m-65.626765 0H65.626764V65.626764h110.909232z" ></path></svg>
                
            </div>
            <div class="btn">
                <svg class="icon like" viewBox="0 0 1105 1024"><path   d="M908.684667 288.585649h-182.458893L743.290275 164.211691a194.929105 194.929105 0 0 0-32.816348-131.265391 98.449043 98.449043 0 0 0-70.226984-32.816347c-50.865339-2.953471-87.291485 44.630233-98.449043 127.327429-1.968981 14.111029-19.033482 112.560073-91.229447 160.800103h-104.027822a32.816348 32.816348 0 0 0-32.816347 32.816348V991.183652a32.816348 32.816348 0 0 0 32.816347 32.816348H928.702639a65.632695 65.632695 0 0 0 63.991878-50.865339l112.888236-487.97909a196.898086 196.898086 0 0 0-196.898086-196.569922z m20.017972 669.781656H379.356979V354.218344H459.428867a32.816348 32.816348 0 0 0 17.064501-4.266125 241.856482 241.856482 0 0 0 68.586167-61.36657 328.163477 328.163477 0 0 0 62.679224-151.283363c5.578779-48.568195 22.315116-71.539638 29.206549-71.539638a32.816348 32.816348 0 0 1 23.955934 11.157558 133.234372 133.234372 0 0 1 17.392664 81.056379l-18.377154 131.265391-6.56327 46.927377c0 6.891433-2.625308 18.048991 3.609798 18.705318a436.457424 436.457424 0 0 0 58.084936 0h193.944614a131.265391 131.265391 0 0 1 131.265391 124.373958zM176.55195 290.226466H65.632695a65.632695 65.632695 0 0 0-65.632695 65.632695v601.19549a65.632695 65.632695 0 0 0 65.632695 65.632695h110.919255a65.632695 65.632695 0 0 0 65.632696-65.632695V355.859161a65.632695 65.632695 0 0 0-65.632696-65.632695z m0 666.828185H65.632695V355.859161h110.919255z"></path></svg>
                <span>{{likes}}</span>
            </div>
            
        </div>
    </div>
</div>

</template>

<script setup>
import {ref,onMounted} from 'vue'
import Avatar from './Avatar.vue';
import { useUserStore } from '@/stores/user';
import * as api from '@/api'
const props = defineProps({
    commentId:Number,
    userId:Number,
    userName:String,
    content:String,
    likes:Number
})
const userStore = useUserStore()
const likeState = ref(0)
const dislikeShow = ref(false)
onMounted(async ()=>{
    likeState.value = await api.likedState(userStore.id,props.commentId)
})
const like =(()=>{
    
})
const disLike =(()=>{

})
</script>

<style scoped>
.comment-box{
    margin-top: 20px;
    display: flex;
    max-width:var(--width-comment);
}
.avatar{
    height: 100px;
    width: 40px;
    margin-left: 10px;
    cursor: pointer;
}
.main{
    min-height: 100px;
    margin-left: 10px;
    min-width: 0;
}
.username{
    font-size: 13px;
    cursor: pointer;
    color: var(--text-dark-2);
}
.content{
    word-wrap: break-word;
    margin-right: 10px;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    letter-spacing: 0.1em;
    color: var(--text-dark);
    font-family: '雅黑';
    line-height: 2em;
}
.footer{
    height: 30px;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    margin-right: 20px;
}

.floor{
    flex-shrink: 0;
    margin-right:5px;
    color: var(--text-dark-2);
    font-size: 13px;
}
.text {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-dark-2);
    font-size: 13px;
}

.btn{
    display: flex;
    align-items: center;
    cursor: pointer;
}
.icon{
    width: 15px;
    height: 15px;
    margin-left: 5px;
    fill: var(--text-dark-2);
}
.btn span{
    margin-left: 5px;
    font-size: 13px;
    color: var(--text-dark-2);

}
.like{
    fill: red;
}
.disLike{
    fill: black;
}

</style>
