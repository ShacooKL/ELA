import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useReadingStore } from './reading';
import * as api from '@/api';

export const useBookStore = defineStore('book', () => {
  // 当前书
  const book = ref({})
  const bookList = ref([])
  const recommendBooks = ref([])
  const hotBooks = ref([])
  const collection = ref([])
  const currReading = ref([])


  async function getBook(id) {
    try {
      const bookData = await api.getBook(id)
      book.value = bookData
    } catch (error) {
      console.error('Error querying book:', error)
      // 处理错误情况
    }
  }
  async function readBook(id){
    await getBook(id)
    const readingStore = useReadingStore()
    readingStore.book = ref(book.value)
  }
	async function getBooks(searchContent) {
    try {
      const booksData = await api.getBooks(searchContent)
      bookList.value = booksData
    } catch (error) {
      console.error('Error querying book:', error)
      // 处理错误情况
    }
  }
  async function initBooks() {
    try {
      const booksData = await api.initHomeView();
      recommendBooks.value = booksData.recommend
      hotBooks.value = booksData.hot
    } catch (error) {
      console.error('Error initBooks:', error)
      // 处理错误情况
    }
  }
  async function getCollection() {
    try {
      const books= await api.getCollection();
      collection.value = books
    } catch (error) {
      console.error('Error initBooks:', error)
      // 处理错误情况
    }
  }
  async function getCurrReading() {
    try {
      const books= await api.getCurrReading();
      currReading.value = books
    } catch (error) {
      console.error('Error initBooks:', error)
      // 处理错误情况
    }
  }
  return {
    book,
    bookList,
    recommendBooks,
    hotBooks,
    collection,
    currReading,
    getBook,
		getBooks,
    initBooks,
    getCollection,
    getCurrReading,
    readBook
  };
  
},
{
  persist: {
    paths:['book']
  }
}
);
