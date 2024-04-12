<template>
<div class="bi-box">
			<div class="cover">
				<img :src="cover" alt="cover" :class="{'zoomed':zoom}"  @mouseover="zoom=true" @mouseleave="zoom=false">
				
			</div>
		<div class="info">
				<div class="title">
						{{title}}
				</div>
				<div class="author">
					{{author}}
				</div>
		</div>
		<div class="tags">
			<div class="tag">历史</div>
			<div class="tag">科幻</div>
			<div class="tag">历史</div>
			<div class="tag">科幻</div>
			<div class="tag">历史</div>

		</div>
		<div class="btn" v-if="!card">
			<button class="readBtn">开始阅读</button>
			<button class="cltBtn">加入收藏</button>
		</div>
</div>

</template>


<script setup>
import {ref} from'vue'
defineProps({
	id:Number,
	title:String,
	author:String,
	cover:String,
	card:{
		type:Boolean,
		default:true
	}
})
const zoom = ref(false)
</script>

<style scoped>
.bi-box{
	min-height: 140px;
	display: flex;
	color: azure;
	margin-top: 20px;
}
.cover{
	height: 150px;
	width: 120px;
	box-shadow: 0 0 10px 0 #8a8a8a;
	cursor: pointer;
	overflow: hidden;
	border-radius: 5px;
	flex-shrink: 0;
}
img{
	height: 150px;
	width: 120px;
	transition: transform 0.3s ease-in-out;

}
.zoomed {
  transform: scale(1.1); /* 调整放大倍数 */
}
.cover:hover{
	box-shadow: 0 0 20px 0 #9d9d9d;
	
}
.info{
	flex-grow: 1;
	margin-left: 20px;
}
.title{
	font-size: 20px;
	color: aliceblue;

}
.author{
	font-size: 15px;

}
.tags{
	width: 300px;
	margin-left: 20px;
	display: flex;
	flex-wrap: wrap-reverse;
	align-content: flex-start;
	flex-direction: row;
	line-height: 30px;
	font-size: 12px;
}
.tag{
	color: #ebebeb;
	min-width: 50px;
	text-align: center;
	border: 1px solid rgb(122, 123, 123);
	margin-right: 20px;
	margin-top: 10px;
}
.btn{
 	display: flex;
	flex-direction: row;
	align-items: end;
	justify-content: end
}
button{
	width: 100px;
	height: 40px;
	cursor: pointer;
	border: none;
	margin-right: 10px;
}
.readBtn{
	background-color: #af2b2b;
	color: azure;
}
.readBtn:hover{
	background-color: #c53232;
}
.cltBtn{
	background-color: #ffffffc7;
}
.cltBtn:hover{
	background-color: #ffffffd8;
}
</style>