<template>
  <div class="setting-box">
    <div class="word">
      编辑资料
    </div>
    <Avatar :size="100" class="avatar" />
    <div class="tip">
      名称
    </div>
    <div class="input">
      <input type="text" v-model="name"></input>
    </div>
    <div class="tip">
      密码
    </div>
    <div class="input">
      <input type="password">
    </div>
    <div class="tip">
      邮箱
    </div>
    <div class="input">
      <input  v-model="email">
    </div>
    <div class="btn">
      <button class="y-btn" @click="commit">确认</button><button @click="reset">重置</button>
    </div>

  </div>
</template>

<script setup>
import Avatar from './Avatar.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const name = ref(userStore.name)
const email = ref(userStore.email)
function commit() {
  userStore.name = name.value
  userStore.email = email.value
}
function reset() {
  name.value = userStore.name
  email.value = userStore.email
}
</script>

<style scoped>
.setting-box {
  width: 400px;
  min-height: 200px;
  background-color: #252525;
  margin: 40px auto;
  color: rgb(224, 224, 224);
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  align-items: center;
  padding: 40px;
}

.word {
  margin-top: 30px;
  font-size: 20px;

  width: 100%;
}

.avatar {
  margin-top: 30px;
  position: relative;
  right: 20px;
}

.tip {
  font-size: 16px;
  width: 100%;
  margin-top: 20px;
}

.input {
  width: 100%;
}

input {
  width: 100%;
  margin-top: 10px;
  height: 35px;
  border: none;
  border-radius: 15px;
  background-color: #ffffff18;
  color: rgb(196, 196, 196);
  font-size: 16px;
  box-sizing: border-box;
  padding: 15px;
}

input:focus {
  outline: none;
}

.btn {
  margin-top: 40px;
  width: 100%;
}

button {
  width: 80px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 20px;
  border: none;
  font-size: 14px;
}

.y-btn {
  background-color: #b63434;
  color: rgb(225, 225, 225);
}
</style>
