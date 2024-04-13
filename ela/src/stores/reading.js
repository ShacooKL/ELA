import { ref,watch} from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import * as api from '@/api'
export const useReadingStore = defineStore('reading', () => {
	const book = ref()
  const chapter = ref()
	const commentShow = ref(false)
	const comments = ref([])
 
	async function postComment(comment){
		const userStore = useUserStore()
		if(!userStore.isLogin){
			userStore.loginWidowShow =true
			return
		}
		comments.value.push({
			userId:userStore.id,
			userName:userStore.name,
			content:comment
		})
	}
	async function getChapter(id) {
    try {
      const data = await api.getChapter(id)
     	chapter.value = data 
    } catch (error) {
      console.error('Error getChapter:', error)
      // 处理错误情况
    }
  }
	async function changeCommentShow(){
		
		if(!commentShow.value){
			await getComments(book.id)
		}
		commentShow.value = !commentShow.value
	}
	async function getComments(id){
		try {
      const data = await api.getComments(id)
     	comments.value = data 
    } catch (error) {
      console.error('Error getChapter:', error)
      // 处理错误情况
    }
	}

  return { book ,comments,commentShow,chapter,postComment,getChapter,changeCommentShow};
},{
  persist:true
})
