<script setup>
import { RouterView } from 'vue-router'
import Login from './components/Login.vue';
</script>

<template>
  <Teleport to="body">
    <!-- 使用这个 modal 组件，传入 prop -->
    <Login/>

  </Teleport>
  <RouterView />
</template>

<style scoped>
</style>
