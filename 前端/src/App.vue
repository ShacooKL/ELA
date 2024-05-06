<script setup>
import { RouterView } from 'vue-router'
import Login from './components/Login.vue';
</script>
<script>
export default {
  created() {
    // 从 sessionStorage 中获取之前保存的 store 状态
    const storedState = sessionStorage.getItem('piniaState');
    if (storedState) {
      try {
        // 将存储的状态解析为 JavaScript 对象
        const parsedState = JSON.parse(storedState);
        // 将存储的状态应用到 Vuex 的 store 中
        pinia.state = parsedState;
      } catch (error) {
        // 解析出错时，输出错误信息
        console.error('Error parsing stored state:', error);
      }
    }
  }
}
</script>
<template>
  <Teleport to="body">
    <!-- 使用这个 modal 组件，传入 prop -->
    <Login/>

  </Teleport>
  <RouterView />
</template>

<style >
/* 修改滚动条的样式 */

</style>
