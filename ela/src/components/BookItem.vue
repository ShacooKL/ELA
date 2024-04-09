<template>
<div class="bi-box">
		<div class="cover">

		</div>
		<div class="info">
				<div class="title">
						Title
				</div>
				<div class="author">
					Author
				</div>
				
		</div>
		<div class="btn">
			<button class="readBtn">开始阅读</button>
			<button class="cltBtn">加入收藏</button>

		</div>
</div>

</template>


<script setup>

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
	background-color: #3aa3bd;
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