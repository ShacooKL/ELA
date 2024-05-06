<template>
	<div class="friends-box">
		<UserItem :followed="true" :self="false" v-for="friend in userStore.friends" class="item" :userId="friend.id"/>
	</div>

</template>

<script setup>
import UserItem from './UserItem.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<style scoped>
.item{
	margin-top: 10px;
	margin-bottom: 40px;
}
.friends-box{
	padding: 20px;
}
</style>