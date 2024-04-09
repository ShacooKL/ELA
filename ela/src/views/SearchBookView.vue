<template>
<Header/>
<BackgroundImg/>
<div class="sc-box">
	<div class="word">
		Result
	</div>
	<div class="filter">
			<span class="hover">相关性</span>
			<span class="hover">浏览量</span>
			<span class="hover">热度</span>
			<div class="sc-content">
					<span class="searchContet">{{ searchContent }}</span>
					<span>的相关结果</span>
			</div>
	</div>
	<BookItem v-for = "book in bookStore.bookList" v-bind="book"/>
	<Loading v-model="loading"/>
</div>
</template>

<script setup>
import { ref,watch} from 'vue'
import Header from '@/components/Header.vue'
import BookItem from '@/components/BookItem.vue'
import BackgroundImg from '@/components/BackgroundImg.vue';
import { useBookStore } from '@/stores/book';
import Loading from '@/components/Loading.vue';
import { useRoute } from 'vue-router'
const props = defineProps({
	searchContent:String
})
const loading = ref(true)
const bookStore = useBookStore()
bookStore.queryBooks(props.searchContent)
.then(() => {loading.value = false})
const route = useRoute()
const userData = ref()

// 当参数更改时获取用户信息
watch(
	() => route.params.searchContent,
	async newSearchContent => {
		userData.value = await fetchUser(newId)
	}
)
</script>

<style scoped>
.sc-box{
	position: absolute;
	width: 80%;
	min-height: 1000px;
	left: 10%;
	top: 60px;

}
.word{
	font-size: 100px;
	color: rgb(217, 230, 230);
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
	font-size: 20px;
}
span{
	display: inline-block;
	height: 100%;
	min-width: 80px;
	text-align: center;
	line-height: 40px;

}
.hover:hover{
	background-color: #686868;
	cursor: pointer;
}
</style>