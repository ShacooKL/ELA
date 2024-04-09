<template>
  <div class="loader" v-show="loading">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<script setup>
const loading = defineModel()
</script>

<style>
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
	margin-top: 60px;
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}
p{
	color: azure;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
