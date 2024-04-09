import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const id = ref(0)
	const name = ref('0')
	const isLogin = ref(false)	
	const loginWidowShow = ref(true)

	function login(){
		//login api
		isLogin = true
	}
	function logout(){
		//logout api
		isLogin = false
	}

  return { id, name , isLogin ,loginWidowShow}
})
