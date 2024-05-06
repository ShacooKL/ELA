import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as api from '@/api'
export const useUserStore = defineStore('user', () => {
	const id = ref(0)
	const name = ref('ShacooKL')
	const avatar = ref('/img/profile') //头像路径
	const email = ref('2801022619@qq.com')
	const isLogin = ref(false)
	const loginWidowShow = ref(true)	//登录窗口显示
	const friends = ref([]) //好友列表
	async function login(username, password) {
		try {
			const data = await api.login(username, password)
			if (data.state) {
				id.value = data.id
				avatar.value = data.avatar
				email.value = data.email
				name.value = data.name
				isLogin.value = true
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
	return { id, name, avatar, email, isLogin, loginWidowShow, friends, login, getFriends }
},
	{
		persist: true,
	}

)
