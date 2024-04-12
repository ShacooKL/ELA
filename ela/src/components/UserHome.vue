<template>
<div class="user-home-box">
	<div class="curr-reading">
		<div class="word">最近在读</div>
		<div class="books">
			<BookItem  v-for="book in bookStore.currReading" v-bind="book" class="card" />
		</div>
		
	</div>

</div>

</template>

<script setup>
import BookItem from './BookItem.vue'
import { useBookStore } from '@/stores/book'
const bookStore = useBookStore()
</script>

<style scoped>
.user-home-box{
	width: 100%;

}
.card{
	width: 400px;
	height: 150px;
	padding: 20px;
	overflow: hidden;
	margin-right: 10px;
	border-radius: 5px;
}
.word{
	font-size: 30px;
	color: rgb(237, 237, 237);
	font-family: "黑体";
	margin-top: 20px;
	margin-left: 20px;
}
.books{
	display: flex;
	flex-wrap: wrap;
	justify-content: start;
}
.curr-reading{
	border-radius: 10px;
	padding-top: 10px;
	padding-bottom: 20px;
}
</style>