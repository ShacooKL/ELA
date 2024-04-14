<template>
<Header/>
<BackgroundImg/>
<div class="book-view-box">
	<div class="top item">
		<BookItem :card="false" v-bind="bookStore.book" />
	</div>
	<div class="info item">
			<span>出版商：{{bookStore.book.cover}}</span>
			<span>ISBN：{{bookStore.book.ISBN}}</span>
			<span>发布日期：{{bookStore.book.publish_date}}</span>
			<span>点赞量：{{bookStore.book.like_count}}</span>
			<span>下载量：{{bookStore.book.download_count}}</span>
	</div>
	<div class="chapter item">
			<span>章节</span>
			<div class="list">
				<router-link v-for="chapter in bookStore.book.chapters" :to="'/reading/'+chapter.id">{{chapter.title}}</router-link>
			</div>
	</div>
</div>

</template>

<script setup>
import Header from '@/components/Header.vue'
import BackgroundImg from '@/components/BackgroundImg.vue'
import BookItem from '@/components/BookItem.vue'
import { useBookStore } from '@/stores/book'
import {ref} from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter()
const bookStore = useBookStore()
onBeforeRouteLeave(async(to, from) => {
	if(to.path.match(/^\/reading\/\d+$/)){
		await bookStore.readBook(bookStore.book.id)
	}
})
</script>

<style scoped>
.book-view-box{
	width: 1000px;
	height: 1000px;
	position: relative;
	margin: 70px auto;
	border-radius: 15px;
}
.bgc{
	background-color: #313131;
}
.item{
	background-color: #313131;
	border-radius: 15px;
	margin-bottom: 20px;
}
.top{
	padding: 20px 20px 40px;
	
}
.item span{
	width: 400px;
	height: 50px;
	color: azure;
	line-height: 50px;
	
}
.info{

	height: 200px;
	display: flex;
	flex-wrap: wrap;
	padding:20px;
	justify-content: space-between;
}
.chapter{
	min-height: 100vh;
	padding: 20px ;
}
.chapter span{
	color: azure;
	font-size: 25px;
}
.list{
	display: flex;
	flex-wrap: wrap;
	margin-top: 20px;
	position: relative;
}
.list a{
	height: 40px;
	width: 33.3333%;
	line-height: 40px;
	border-radius: 15px;
	padding-left: 20px;
	box-sizing: border-box;
	color: rgb(184, 190, 190);
}
.list a:hover{
	background-color: #616161b0;
}
</style>