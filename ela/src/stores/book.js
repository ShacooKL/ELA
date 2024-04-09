import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as api from '@/api';

export const useBookStore = defineStore('book', () => {
  // 当前书
  const book = ref({
    id: 1,
    title: 'Book1',
    author: '麦瑟尔夫',
    cover: '/img/dark.jpg'
  });
  const bookList = ref([])
  async function queryBook(id) {
    try {
      const bookData = await api.getBook(id);
      book.value = bookData;
    } catch (error) {
      console.error('Error querying book:', error);
      // 处理错误情况
    }
  }
	async function queryBooks(searchContent) {
    try {
      const booksData = await api.getBooks(searchContent);
      bookList.value = booksData;
    } catch (error) {
      console.error('Error querying book:', error);
      // 处理错误情况
    }
  }
  return {
    book,
		bookList,
    queryBook,
		queryBooks
  };
});
