import { ref} from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
export const useReadingStore = defineStore('reading', () => {
	const book = ref({
		id :1,
		authorId:1,
		authorName:'author',
		cover:'/img/dark.jpg'
	})
  const chapter = ref({
		chapter_order : 1,
		title:'title',
		content:'content '.repeat(20)
	})
	const color = ref({
			ackgroundColor:"#E6E1D6",
			pageColor:"#F4F0E7",
			color:"#181716",
			lighter:"#f9f5ea"
	})
	const theme = ref({
		dark:{
			backgroundColor:"#0A0A0A",
			pageColor:"#111111",
			color:"#A0A0A0",
			lighter:"#1a1a1a"
		},
		day:{
			backgroundColor:"#E6E1D6",
			pageColor:"#F4F0E7",
			color:"#181716",
			lighter:"#f9f5ea"
		}
	})
	const commentShow = ref(false)
	const comments = ref([
		{
			userId:1,
			userName:'超级无敌暴龙战士',
			content:'超级无敌暴龙战士哈哈哈哈哈哈哈'.repeat(20)
		},
		{
			userId:1,
			userName:'超级无敌暴龙战士',
			content:'超级无敌暴龙战士哈哈哈哈哈哈哈'.repeat(20)
		},
		{
			userId:1,
			userName:'超级无敌暴龙战士',
			content:'超级无敌暴龙战士哈哈哈哈哈哈哈'.repeat(20)
		},
		{
			userId:1,
			userName:'超级无敌暴龙战士',
			content:'超级无敌暴龙战士哈哈哈哈哈哈哈'.repeat(20)
		},
		{
			userId:1,
			userName:'超级无敌暴龙战士',
			content:'超级无敌暴龙战士哈哈哈哈哈哈哈'.repeat(20)
		},
		{
			userId:1,
			userName:'超级无敌暴龙战士',
			content:'超级无敌暴龙战士哈哈哈哈哈哈哈'.repeat(20)
		},

	])
 
	function postComment(comment){
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
  return { book ,chapter,comments,commentShow,postComment };
})
