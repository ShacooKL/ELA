<template>
  <span class="info">{{ tips }}</span>
  <div class="item">

    <div class="icon cur" v-show="state == 'input'">
      <svg t="1712834462942" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="13600" width="20" height="20">
        <path
          d="M44.42112 578.12992l685.25568 0-259.18464 248.69376 183.22432 0 324.00896-310.79424-324.00896-310.8352L470.49728 205.19424l259.18464 248.66304L44.42112 453.85728 44.42112 578.12992z"
          fill="#bc2e2e" p-id="13601"></path>
      </svg>
    </div>
    <div class="icon y" v-show="state == 'ok'">
      <svg viewBox="0 0 1024 1024">
        <path fill=#44c975
          d="M387.072 611.328L236.6464 460.8 128 569.3952l259.072 259.1232 515.1232-515.072L793.6 204.8z"></path>
      </svg>
    </div>
    <div class="icon n" v-show="state == 'err'">
      <svg viewBox="0 0 1024 1024">
        <path fill=#bc2e2e
          d="M886.784 746.496q29.696 30.72 43.52 56.32t-4.608 58.368q-4.096 6.144-11.264 14.848t-14.848 16.896-15.36 14.848-12.8 9.728q-25.6 15.36-60.416 8.192t-62.464-34.816l-43.008-43.008-57.344-57.344-67.584-67.584-73.728-73.728-131.072 131.072q-60.416 60.416-98.304 99.328-38.912 38.912-77.312 48.128t-68.096-17.408l-7.168-7.168-11.264-11.264-11.264-11.264q-6.144-6.144-7.168-8.192-11.264-14.336-13.312-29.184t2.56-29.184 13.824-27.648 20.48-24.576q9.216-8.192 32.768-30.72l55.296-57.344q33.792-32.768 75.264-73.728t86.528-86.016q-49.152-49.152-93.696-93.184t-79.872-78.848-57.856-56.832-27.648-27.136q-26.624-26.624-27.136-52.736t17.92-52.736q8.192-10.24 23.552-24.064t21.504-17.92q30.72-20.48 55.296-17.92t49.152 28.16l31.744 31.744q23.552 23.552 58.368 57.344t78.336 76.288 90.624 88.576q38.912-38.912 76.288-75.776t69.632-69.12 58.368-57.856 43.52-43.008q24.576-23.552 53.248-31.232t55.296 12.8q1.024 1.024 6.656 5.12t11.264 9.216 10.752 9.728 7.168 5.632q27.648 26.624 27.136 57.856t-27.136 57.856q-18.432 18.432-45.568 46.08t-60.416 60.416-70.144 69.632l-77.824 77.824q37.888 36.864 74.24 72.192t67.584 66.048 56.32 56.32 41.472 41.984z">
        </path>
      </svg>
    </div>

    <input ref="inputRef" v-model="input" :type="type" @focusin="focusIn" @focusout="focusOut"
    ><button @mousedown="next" v-show="focus">继续</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import * as api from '@/api'
const props = defineProps({
  tips: String,
  type: {
    type: String,
    default: 'text'
  }
})
const userStore = useUserStore()
const focus = ref(false)//input是否处于focus
const state = ref('')//提示图标状态
const inputRef = ref(null)//input引用
const nextShow = defineModel('nextShow')//下一个显示的组件
const input = defineModel('input')//input内容
const tips = defineModel('tips')
const valid = defineModel('valid')
//输入状态
function focusIn() {
  focus.value = true
  state.value = 'input'
}
//失去焦点 数据校验
async function focusOut() {
  focus.value = false
  let result = false
  if (props.type == 'name') {
    const user = await api.getUser({ id: 0, name: input.value })
    if (user == null) {
      result = true
    } else {
      tips.value = '该用户已存在'
    }
  } else if (props.type == 'password') {
    if (input.value.length >= 6)
      result = true
    else
      tips.value = '密码长度需大于6位'
  } else if (props.type == 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    result = emailRegex.test(input.value);
    if (!result) {
      tips.value = '邮箱格式错误'
    }
  }
  if (result) {
    state.value = 'ok'
    valid.value = true
    tips.value =''
  } else {
    state.value = 'err'
    valid.value = false
  }
}
onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 0));
  inputRef.value.focus();
});
async function next() {
  await focusOut()
  if(valid.value)
    nextShow.value = true
}
</script>

<style scoped>
.item {
  font-size: 25px;
  color: azure;
  min-height: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  margin-bottom: 20px;
}

.item input {
  flex-grow: 1;
  width: 400px;
  height: 30px;
  background-color: #d7d7d700;
  border: none;
  padding: 1px 5px 0 5px;
  border-radius: 5px;
  color: #d3d3d3;
  font-size: 15px;

  box-sizing: border-box;

  font-weight: bold;
}

.item input:focus {
  outline: 1.5px solid rgb(48, 177, 232);
  ;
}

button {
  height: 30px;
  border: 1px solid #44c975;
  width: 80px;
  background-color: #76767600;
  border-radius: 5px;
  margin-left: 10px;
  color: #44c975;
  font-weight: bold;
  cursor: pointer;
}

.info {
  font-size: 15px;
  color: #00ffffd2;
  margin-top: 20px;
  margin-bottom: 10px;
}

.icon {
  margin-right: 5px;
}

.y {
  width: 25px;
  height: 25px;
}

.n {
  width: 17px;
  height: 17px;
  margin-bottom: 15px;
}

.cur {
  margin-top: 5px;
}
</style>
