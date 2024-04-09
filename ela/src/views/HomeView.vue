<script setup>
import BackgroundImg from '@/components/BackgroundImg.vue';
import Header from '@/components/Header.vue'
import Loading from '@/components/Loading.vue';
</script>

<template>

	<Header/>
	<BackgroundImg/>
	<div class="word">
		Find your books
	</div>
	<div class="main-box">
		<Loading></Loading>
	</div>
</template>

<style scoped>
.main-box{
	position: absolute;
	width: 100%;
	min-height: 1000px;
	background-color: #fbfbfb4e;
	top: 260px;
	left: 0;
}
.word{
	font-size: 70px;
	color: azure;
	position: absolute;
	width: 100%;
	top: 100px;
	left: 0;
	text-align: center;

}
</style>