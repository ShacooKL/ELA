// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888/Web';

// 创建 Axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  },
});

export const login = (name,password) => {
	// 正常：
  // return axios.get(`/book/query/${id}`);
	// 测试：
	// 模拟异步请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟异步操作成功，返回数据
      if(password =='123')
        resolve({state:true,id:55210919,name:'ShacooKL',avatar:'/img/profile.jpg'});
      else
        resolve({state:false})
      // 或者模拟异步操作失败y
      // reject(new Error('Failed to fetch book.'));
    }, 50); 
  });

};

export const initHomeView = () => {
	// 测试：
	// 模拟异步请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rec = []
      const hot = []
      for(let i=0;i<10;i++){
        rec.push({id:i, title: 'Book Title', author: 'Author Name',cover:'/img/cover1.jpg' })
        hot.push({ id:i, title: 'Book Title', author: 'Author Name',cover:'/img/bgc1.jpg' })
      }
       
      resolve({
        recommend:rec,
        hot:hot
      });
      // reject(new Error('Failed to fetch book.'));
    }, 50); 
  });
};

export const getCollection = ()=>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const collection = []
    
      for(let i=0;i<10;i++)
        collection .push({id:i, title: 'Book Title', author: 'Author Name',cover:'/img/bgc3.png' })
      resolve(collection);
      // reject(new Error('Failed to fetch book.'));
    }, 50); 
  });
}
export const getCurrReading = ()=>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const books = []
      for(let i=0;i<10;i++)
        books.push({id:i, title: 'Book Title', author: 'Author Name',cover:'/img/bgc2.jpeg' })
      resolve(books);
      // reject(new Error('Failed to fetch book.'));
    }, 50); 
  });
}
export const getFriends = (id)=>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = []
      for(let i=0;i<10;i++)
        users.push({id:i,cover:"/img/profile.jpg"})
      resolve(users);
      // reject(new Error('Failed to fetch book.'));
    }, 50); 
  });
}
export const getBook = (id) => {
	// 正常：
  // return axios.get(`/book/query/${id}`);

	// 测试：
	// 模拟异步请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟异步操作成功，返回数据
      resolve({  title: 'Book Title', author: 'Author Name',cover:'/img/cover1.jpg' });
      // 或者模拟异步操作失败y
      // reject(new Error('Failed to fetch book.'));
    }, 50); // 延迟1秒模拟异步操作
  });

};

export const getBooks = (searchContent) => {
  // 模拟异步请求
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const books = [];
      for (let i = 0; i < 2; i++) {
        const book = { id: i, title: searchContent + ' - '+ i, author: 'Author Name', cover: '/img/cover1.jpg' };
        books.push(book); // 将当前 book 对象推送到 books 数组中
      }
      // 模拟异步操作成功，返回数据
      resolve(books);
     
      //或者模拟异步操作失败
      reject(new Error('Failed to fetch books.'));
    }, 50); // 延迟1秒模拟异步操作
  });
};




