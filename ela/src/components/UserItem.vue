<template>
<div class="user-item-box">
	<div class="avatar" >
		<Avatar :size="68" :userId="userId"/>
	</div>
	<div class="info">
		<div class="name">
			ShacooKL
		</div>
		<div class="motor">
			<input placeholder="编辑个性签名" v-if="self" >
			<span v-if="!self">编辑个性签名</span>
		</div>
	</div>
	<div class="function">
			<button v-if="!self&&!followed">关注</button>
			<button v-if="!self&&followed" class="d-btn">取消关注</button>
	</div>
</div>


</template>

<script setup>
import Avatar from './Avatar.vue'
const props = defineProps({
	self:{
		type:Boolean,
		default:false
	},
	followed:{
		type:Boolean,
		default:false
	},
	userId:Number
})
</script>

<style scoped>
.avatar{
	display: inline-block;
	width: 68px;
	height: 68px;
	border-radius: 50%;
	border: solid 2px rgb(206, 206, 206);
}
.user-item-box{
	display: flex;
	width: 100%;
}
.info{
	margin-left: 20px;
	width: 70%;
}
.name{
	padding-top: 10px;
	font-size: 20px;
	font-weight: bold;
	color: azure;
}
.motor{
	font-size: 13px;
	color: #f0ffff52;
	width: 100%;
}
.motor span{
	color: #d4d4d4;
	background-color: #ffffff00;
	height: 30px;
	width: 100%;
	font-size: 15px;
}
.motor input{
	width: 100%;
	border: none;
	background-color: #ffffff00;
	height: 30px;
	border-radius: 5px;
	box-sizing: border-box;
	color: #d4d4d4;
	font-size: 15px;
}
.motor input:hover{
	background-color: #dadada22;
	border: 1px solid #868686;
}
.motor input:focus{
	outline: none;
	background-color: #fff;
	color: #484848;
}

.function{
	height: 60px;
	flex-grow: 1;
	display: flex;
	align-items: end;
	justify-content: end;
	padding-right: 20px;
}
.function button{
	width: 100px;
	height: 40px;
	border-radius: 5px;
	border: none;
	background-color: #0c75ae;
	color: #ffffff;
	cursor: pointer;
}
.function button:hover{
	background-color: #0f82c0;
}
.function .d-btn{
	background-color: #dadada;
	color: #484848;
}
.function .d-btn:hover{
	background-color: #e3e3e3;
}
</style>