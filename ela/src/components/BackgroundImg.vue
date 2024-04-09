<template>
<div class="bg-img" :style="{backgroundImage: 'url(' + img + ')'}"></div>
</template>
<script setup>
defineProps({
	img:{
		type:String,
		default:'/img/dark.jpg'
	}
})
</script>
<style scoped>
.bg-img{
	position: fixed;
	width: 100%;
	height: 100%;
	top:0;
	left: 0;
	background-size: cover;
  background-position: 70%;

}
</style>