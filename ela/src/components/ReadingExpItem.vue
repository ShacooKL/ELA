<template>
	<div class="rei-box">
		<el-page-header :icon="ArrowLeft" @back="router.push({name:'readingExpList'})">
			<template #content >
				<div class="title-box">
					<Avatar :size="25"/>
					<span> {{readingStore.exp.title}} </span>
				</div>
				
			</template>
			<template #extra v-if="self">
				<button v-if="!edit" @click="edit=true">编辑</button>
				<button v-if="edit" @click="edit=false">保存</button>
			</template>
  	</el-page-header>
		<div class="content" v-if="!edit">
			<MdPreview  :modelValue="state.text"  :theme="state.theme" class="content" />
			
		</div>
		<MdEditor v-if="edit" v-model="state.text" :theme="state.theme "  class="content" />
	</div>

</template>

<script setup>
import { reactive,ref,computed} from 'vue'
import { MdEditor, MdPreview } from 'md-editor-v3'
import Avatar from './Avatar.vue'
import { useRouter } from 'vue-router'
import { useReadingStore } from '@/stores/reading'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()
const readingStore = useReadingStore()
import 'md-editor-v3/lib/style.css';
const state = reactive({
  text: readingStore.exp.content,
  theme: ''
});
const edit = ref(false)
const self = computed(()=>{
	return userStore.isLogin&&userStore.$id==readingStore.exp.authorId
})
</script>
<style scoped>
.rei-box{
	width: 100%;
	min-height: 800px;
	background-color: #f3f3f3;
}
:deep(.el-page-header){
	background-color: #f3f3f3;
	height: 50px;
	font-size: 50px;
	border-bottom: 1px solid rgba(183, 183, 183, 0.491);
}
:deep(.el-page-header__extra){
	height: 100%;
	display: flex;
}
:deep(.cm-scroller){
	min-height: 800px;
	background-color: #f3f3f3;
}
:deep(.el-page-header__back){
	padding-left: 20px;
	font-size: 40px;
}
.content{
	min-height: 800px;
	background-color: #f3f3f3;
}
button{
	width:50px;
	height: 30px;
	border:none;
	background-color: #009bc6;
	border-radius: 10px;
	margin-right: 20px;
	margin: 0 20px auto;
	color:rgb(244, 244, 244);
	cursor: pointer;
}
.title-box{
	display: flex;
}
.title-box span{
	margin-left: 20px;
}
</style>