<template>

    <div class="r-box">
        <div class="pos"></div>
        <div class="main" :style="{width:mainWidth}">
            <div class="content" :style="{fontFamily:curFontFamily,fontSize:curFontSize+'px'}">
               {{ content }}
            </div>
           
                <ReadingSetting v-model:settingShow="settingShow" 
                v-model:theme="curTheme" 
                v-model:fontFamily="curFontFamily"
                v-model:fontSize="curFontSize"
                v-model:width="mainWidth"
                />
            
        </div>
       
        <Transition>
            <CommentArae />
        </Transition>
        <ReadingSideBar v-model:theme="curTheme" v-model:settingShow="settingShow"/>
    </div>

</template>

<script setup>
import { ref, watch } from 'vue'
import CommentArae from '@/components/CommentArae.vue'
import ReadingSideBar from '@/components/ReadingSideBar.vue'
import ReadingSetting from '@/components/ReadingSetting.vue'
const curTheme = ref('')
const curFontFamily = ref('黑体')
const curFontSize = ref(20)
const initWidth = '60%'
const mainWidth = ref(initWidth)
const content = ref(' 我是无敌暴龙战神 '.repeat(5000))
const settingShow = ref(false)
watch(curTheme,(newTheme)=>{
    if(newTheme=='dark'){
        document.documentElement.setAttribute('data-theme', "dark");
    }
        
    else{
        document.documentElement.setAttribute('data-theme', "");
    }
})

</script>

<style scoped>
.pos{
    width: 100px;
    flex-shrink: 0;

}
.r-box {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    min-width: 100%;
    min-height: 100%;
    background-color: var(--bgc-1);
   
}
.main {
    min-height: 1000px;
    min-height: 2000px;
    flex-shrink: 0;
    min-width: 0px;
    background-color: var(--page-1);
    position: relative;
}
.content{
    word-wrap: break-word;
    padding: 50px;
    line-height: 2.5em;
    letter-spacing: 0.2em;
    color: var(--text-dark);
}
.setting{
    position: absolute;
}
.v-enter-active
 {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
