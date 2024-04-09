<template>
<Header/>
<div class="sc-box">
	<div class="word">
		Result
	</div>
	<div class="filter">
			<span>相关性</span>
			<span>浏览量</span>
			<span>热度</span>
			<div class="sc-content">
					<span class="searchContet">{{ searchContent }}</span>
					<span>的相关结果</span>
			</div>
	</div>
	<BookItem v-for="book in books"/>
</div>
</template>

<script setup>
import {ref} from 'vue'
import Header from '@/components/Header.vue'
import BookItem from '@/components/BookItem.vue'
const books=[1,1,1,1,1,1,1,1]
const searchContent = ref('5555555555555555')
</script>

<style scoped>
.sc-box{
	position: absolute;
	width: 80%;
	min-height: 1000px;
	left: 10%;
	top: 60px;
	/* background-color: #ffffff62; */
}
.word{
	font-size: 100px;
	color: azure;
	text-align: center;
}
.filter{
	height: 40px;
	background-color: #3a3a3a6b;
	position: relative;
	color: azure;
}
.sc-content{
	display: inline-flex;
	height: 100%;
	min-width: 200px;
	position: absolute;
	right: 0;
}
.sc-content span{
	margin-right: 10px;
}
.searchContet{
	color: rgb(48, 195, 195);
	font-size: 15px;
}
span{
	display: inline-block;
	height: 100%;
	min-width: 80px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
}
span:hover{
	background-color: #fff;
}
</style>