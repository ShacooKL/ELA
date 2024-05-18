<script setup>
import BackgroundImg from '@/components/BackgroundImg.vue';
import Header from '@/components/Header.vue'
import BookItem from '@/components/BookItem.vue'
import { useBookStore } from '@/stores/book'
import { useRouter } from 'vue-router'
const bookStore = useBookStore()
const router = useRouter()


</script>

<template>

	<Header/>
	<BackgroundImg/>
	<div class="word">
		Find your books
	</div>
	<div class="main-box">
		<div class="item">
			<div class="tip">
				Recommend
			</div>
			<div class="flex">
				<BookItem  v-for="book in bookStore.recommendBooks" v-bind="book" class="card" />
			</div>
		</div>
		<div class="item">
			<div class="tip">
				Hot
			</div>
			<div class="flex">
				<BookItem  v-for="book in bookStore.hotBooks" v-bind="book" class="card" />
			</div>
		</div>
		
	</div>
</template>

<style scoped>
.main-box{
	position: absolute;
	width: 80%;
	min-height: 1000px;
	top: 260px;
	left: 10%;
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
.item{
	margin-bottom: 40px;
}
.flex{
	display:flex;

	margin: 0 auto;
	flex-wrap: wrap;
	justify-content: normal;
}
.card{
	box-sizing: border-box;
	width: 50%;
}
.tip{
	line-height: 50px;
	box-sizing: border-box;
	height: 50px;
	font-size: 25px;
	padding-bottom: 20px;
	padding-left: 20px;
	color: rgb(252, 252, 252);
	margin-bottom: 20px;
	background: linear-gradient(to right, #3f464766, #e8dfce31);
	border-radius: 5px;
}
</style>