<template>
<div class="search-box">
	<CompileInput v-model:searching="searching" v-model:errInfo = "errInfo" v-model:searchContent="searchContent"/>
	<button @click="search">搜索</button>
</div>
<span class="err">{{ errInfo }}</span>

</template>

<script setup>
import {ref,watch} from'vue'
import { useRouter } from 'vue-router';
import CompileInput from './CompileInput.vue';
const searchContent = ref('')
const router = useRouter()
const searching = ref(false)
const errInfo = ref("")
function search(){
	searching.value = true;
	if(searchContent.value=='')
		return

}
watch(searchContent,()=>{
	console.log(searchContent.value)
})
</script>

<style scoped>
.search-box{
	min-height: 40px;
	display: flex;
	position: relative;
	color: azure;
}
.input:deep(){
	flex-grow: 1;
	width: calc(100% - 150px);
	border-radius: 10px;
	min-height: 40px;
	background-color: rgb(0, 0, 0);
	border:1.5px solid white;
	box-sizing: border-box;
	padding: 5px 80px 5px 10px;
	color: azure;
	line-height: 1.7;
}
input:focus:deep(){
	outline: none;
}
button{
	width: 70px;
	height: 100%;
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
.err{
	color: rgb(67, 223, 223);
	margin: 10px;
	padding-top: 20px;
}
</style>