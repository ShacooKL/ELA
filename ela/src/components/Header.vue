<script setup>
import {ref,computed,watch,onMounted,onUnmounted} from'vue'
import Search from '@/components/Search.vue'

const scrollY=ref(0)
const show = ref(true)
const backgroundColor = ref('#00000051')
const isHead = computed(()=>{
	return scrollY.value < 200
})

watch(isHead, () => {
	show.value=false

	setTimeout(() => {
		if(!isHead.value)
			backgroundColor.value = '#000000'
		else
			backgroundColor.value = '#00000051'
		show.value=true
  }, 0); // 设置延迟一秒再显示
})
const updateWindowScrollHeight = () => {
	scrollY.value = window.scrollY;
};

onMounted(() => {
	updateWindowScrollHeight();
	window.addEventListener('scroll', updateWindowScrollHeight);
});
onUnmounted(() => {
	window.removeEventListener('scroll', updateWindowScrollHeight);
});

</script>

<template>
<Transition>
	<div class="header-box" v-if="show" :style="{backgroundColor:backgroundColor}">
		<div class="search-container">
			<Search />
		</div>
		
		<div class="menu">
			<span>首页</span>
			<span>个人中心</span>
			<span>个人图书馆</span>
		</div>
	</div>
</Transition>

</template>


<style scoped>
.header-box{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 60px;
	background-color: #00000089;
	color:azure;
	display: flex;
	align-items: center;
	flex-direction: row-reverse;
	z-index: 999;
}
.search-container{
	width: 40%;
	height: 100%;
	position: absolute;
	left: 30%;
	padding-top: 10px
}
.menu{
	height: 100%;
}
span{
	display: inline-block;
	min-width: 100px;
	color:azure;
	text-align: center;
	align-items: center;
	cursor: pointer;
	height: 100%;
	line-height: 60px;
}
span:hover{
	background-color: #3433336c;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 1.0s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>