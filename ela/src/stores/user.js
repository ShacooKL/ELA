import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as api from '@/api'
export const useUserStore = defineStore('user', () => {
	const id = ref(0)
	const name = ref('ShacooKL')
	const avatar = ref('/img/profile')
	const isLogin = ref(false)
	const loginWidowShow = ref(true)
	const friends = ref([])
	async function login(name, password) {
		try {
			const data = await api.login(name, password)
			if (data.state) {
				id.value = data.id
				isLogin.value = true
				avatar.value = data.avatar
				name.value = name.value
				return true
			} else {
				return false
			}
		} catch (error) {
			console.error('Error querying book:', error);
			// 处理错误情况
			return false
		}
	}
	async function getFriends(id) {
		try {
			friends.value = await api.getFriends(id)

		} catch (error) {
			console.error('Error querying book:', error);
			// 处理错误情况
		}
	}

	function logout() {
		//logout api
		isLogin = false
	}
	return { id, name, isLogin, loginWidowShow, friends, avatar, login, getFriends }
},
	{
		persist: true,
	}

)
