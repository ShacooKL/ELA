<template>
<div class="comment-input-box">
    <div class="avatar">

    </div>
    <div class="input-area"  @click="isExpand=true" >
        <textarea v-model="input"/>

        <div class="footer" v-show="isExpand">
            <div class="limit">
                <span>{{input.length}}</span><span>/150</span>
            </div>
            <div class="btn-box">
                <button>发布</button>
                <button @click.stop="isExpand=false">取消</button>
            </div>
        </div>
        
        
    </div>
</div>
</template>

<script setup>
import {ref} from 'vue'
const isExpand = ref(false)
const input = ref('')
function expand(){
    isExpand
}
</script>

<style scoped>
.comment-input-box{
    display: flex;
    min-height: 30px;
    align-items: flex-start;
    
}
.avatar{
    height: 30px;
    width: 30px;
    background-color: #39a1af;
}
.input-area{
    flex-grow: 1;
    min-height: 30px;
    background-color: #5a59596b;
}
textarea{
    width: 100%;
    min-height: 30px;
    resize: none;
    border: none;
    border-radius: 5px;
    background-color: #37373700;
    padding:5px 10px;

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
    width: 45px;
    height: 25px;
    border-radius: 3px;
}
</style>