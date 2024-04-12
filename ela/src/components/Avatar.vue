<template>
<div class="avatar-box" :style="{ height:size+'px',width:size+'px'}">
	<img :src="avatar" alt="Avatar" class="avatar">
</div>
</template>

<script setup>
defineProps({
	avatar:{
		type:String,
		default:'/img/profile.jpg'
	},
	size:Number
})
</script>

<style scoped>
.avatar-box{
	overflow: hidden;
  border-radius: 50%; 
}
.avatar {
  width: 100%; /* 图片宽度与容器相同 */
  height: auto; /* 图片高度自动调整 */
  display: block; /* 块级元素，占据整行 */
}
</style>
