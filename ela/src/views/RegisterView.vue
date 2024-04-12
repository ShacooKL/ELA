<template>
  <BackgroundImg />
  <div class="main">
    <span  class="word" v-if="show[0]">{{ disText[0] }}</span>
    <span  class="word" v-if="show[1]">{{ disText[1] }}</span>
    <RegInputItem v-if="show[2]" :tips="'请输入用户名'" v-model:nextShow="show[3]" v-model:input="name"/>
    <RegInputItem v-if="show[3]" :tips="'请输入密码'" v-model:nextShow="toRegister" v-model:input="password"/>
    <div class="result" v-if="sucess">注册成功  <a href="/">去主页</a></div>
    <div class="tips">
      {{ tips }}
    </div>
  </div>
  
</template>

<script setup>
import { reactive,ref,watch} from 'vue'
import BackgroundImg from '@/components/BackgroundImg.vue'
import RegInputItem from '@/components/RegInputItem.vue';

const disText = reactive(['',''])
const show = reactive([false,false,false,false])
const tips=ref('these are some tips 撒打算')
const name = ref('')
const password = ref('')
const toRegister = ref(false)
const sucess = ref(false)
const text = [
  '欢迎来到E-Library',
  '在开始一切之前，请先完成注册',
]

async function startTyping() {
		for(let i=0;i<2;i++){
      show[i]=true
      let index = 0;
      const timer = setInterval(() => {
        disText[i] += text[i][index];
        if (index >= text[i].length - 1) {
          clearInterval(timer);
        }
        index++;
      }, 50);
    	await new Promise(resolve => setTimeout(resolve, 1000)); 
		}
    show[2]=true
}
startTyping();
watch(toRegister,async()=>{
  sucess.value=true
})
</script>

<style scoped>
.main {
  position: absolute;
  width: 36%;
  min-height: 20px;
  top: 15%;
  left: 32%;
  background-color: #2424247c;
  backdrop-filter: blur(10px); 
  padding: 50px;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
}
.word{
  font-size: 20px;
  color: #d3d3d3;
  margin-bottom: 10px;
}
.tips{
  width: 100%;
  height: 40px;
  font-size: 17px;
  color: #d3d3d3;
  position: relative;
  top:90px;
}
.result{
  color:#00ffffd2;
  font-size: 20px;
  text-align: center;
}
</style>
