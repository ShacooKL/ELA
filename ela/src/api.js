// api.js
import axios from 'axios';

const API_BASE_URL = 'http://api.example.com';

// 创建 Axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  },
});


export const getBook = (id) => {
	// 正常：
  // return axios.get(`/book/query/${id}`);

	// 测试：
	// 模拟异步请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟异步操作成功，返回数据
      resolve({ id, title: 'Book Title', author: 'Author Name',cover:'/img/dark.jpg' });
      // 或者模拟异步操作失败y
      // reject(new Error('Failed to fetch book.'));
    }, 1000); // 延迟1秒模拟异步操作
  });

};

export const getBooks = (searchContent) => {
  // 模拟异步请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const books = [];
      for (let i = 0; i < 2; i++) {
        const book = { id: i, title: searchContent + ' - '+ i, author: 'Author Name', cover: '/img/dark.jpg' };
        books.push(book); // 将当前 book 对象推送到 books 数组中
      }
      // 模拟异步操作成功，返回数据
      resolve(books);
      // 或者模拟异步操作失败
      // reject(new Error('Failed to fetch books.'));
    }, 1000); // 延迟1秒模拟异步操作
  });
};




