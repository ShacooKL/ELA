<template>
<Header/>
<BackgroundImg/>
<div class="box">
	<div class="main">
		<div class="top">
				<div class="info">
					<UserItem :self="true"/>
				</div>
				<div class="menu">
					<el-tabs  @tab-click="handleClick" >
					<el-tab-pane label="Home" name="userHome" ></el-tab-pane>
					<el-tab-pane label="Collection" name="userCollection" ></el-tab-pane>
					<el-tab-pane label="Friends" name="friends"></el-tab-pane>
					<el-tab-pane label="Setting" name="setting"></el-tab-pane>
				</el-tabs>
				</div>
		</div>
		<div class="body">
			<RouterView/>
		</div>
	</div>
</div>

</template>

<script setup>
import {watch} from'vue'
import Header from '@/components/Header.vue'
import BackgroundImg from '@/components/BackgroundImg.vue'
import UserItem from '@/components/UserItem.vue'
import { useRouter,useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
function handleClick(tab, event) {
	router.push({name:tab.props.name})
}
watch(
  () => route.params.id,
  async newId => {
		
  }
)
</script>

<style scoped>
.box{
	position: absolute;
	top: 70px;
	left:0;
	min-width: 100%;
	min-height: 100%;
	display: flex;
	justify-content: center;

}
.main{
	min-width: 1420px;
	width: 80%;
	min-height: 100%;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	background-color: rgba(161, 32, 32, 0);
}
.top{
	height: 240px;
	min-width: 100%;
}
.info{
	height: 180px;
	background-size: cover;
	background-position: 0% 18%;
	background-image: url("/img/aa1.png");
	display: flex;
	flex-direction: row;
	align-items: end;
	padding-left: 20px;
	padding-bottom: 10px;
	box-sizing: border-box;
	width: 100%;
}
.menu{
	width: 100%;
	height: 50px;
	background-color: #4f4f4f;
}
.menu :deep(.el-tabs){
	height: 100%;
	background-color: #212121;

}
.menu :deep(.el-tab-pane){
	min-width: 300px;
	height: 100%;
}
.menu :deep(.el-tabs__item) {
	height: 50px;
	min-width: 120px;
	color: azure;
	cursor: pointer;
}
.body{
	width: 100%;
	min-height: 100vh;
	flex-grow: 1;
	padding-bottom: 100px;
}

</style>