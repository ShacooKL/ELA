<template>
<div class="bi-box">
		<div class="cover" :style="{backgroundImage:'url('+cover+')'}">

		</div>
		<div class="info">
				<div class="title">
						{{title}}
				</div>
				<div class="author">
					{{author}}
				</div>
				
		</div>
		<div class="btn">
			<button class="readBtn">开始阅读</button>
			<button class="cltBtn">加入收藏</button>

		</div>
</div>

</template>


<script setup>
defineProps({
	id:Number,
	title:String,
	author:String,
	cover:String
})
</script>

<style scoped>
.bi-box{
	min-height: 140px;
	display: flex;
	margin-top: 20px;
	color: azure;
}
.cover{
	height: 150px;
	width: 120px;
	background-size: cover;
  background-position: 70%;
	box-shadow: 0 0 10px 0 white;
	cursor: pointer;
}
.cover:hover{
	box-shadow: 0 0 20px 0 white;
}
.info{
	flex-grow: 1;

	margin-left: 20px;
}
.title{
	font-size: 20px;
}
.author{
	font-size: 15px;
}
.btn{
 	display: flex;
	flex-direction: row;
	align-items: end;
}
button{
	width: 100px;
	height: 40px;
	margin-bottom: 20px;
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