<template>
<div class="search-box">
	<input v-model="searchContent" @keydown.enter="search">
	<button @click="search">搜索</button>
</div>
</template>

<script setup>
import {ref} from'vue'
import { useRouter } from 'vue-router';
const searchContent = ref('')
const router = useRouter()
function search(){
	if(searchContent.value=='')
		return
	router.push({ name: 'searchBook', params: { searchContent: searchContent.value } })
}
</script>

<style scoped>
.search-box{
	height: 40px;
	display: flex;
	position: relative;
	color: azure;
}
input{
	border-radius: 10px;
	height: 40px;
	background-color: rgba(36, 36, 36, 0.411);
	border:1px solid white;;
	box-sizing: border-box;
	padding: 5px 10px 5px 10px;
	flex-grow: 1;
	color: azure;
}
input:focus{
	outline: none;
}
button{
	width: 70px;
	height: 40px;
	border: none;
	border-radius: 10px;
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	position: absolute;
	right: 1px;
	background-color: rgba(0, 0, 0, 0);
	color: azure;
	cursor: pointer;
}
button:hover{
	background-color: rgb(255, 255, 255);
	color: black;
}
</style>