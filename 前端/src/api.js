// api.js
import axios from 'axios';
import Library from '@/class';
const { Comment, Chapter, Book,User,ReadingExp } = Library;

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
        resolve({state:true,id:55210919,name:name,avatar:'/img/profile.jpg',email:name+'@qq.com'});
      else
        resolve({state:false})
      // 或者模拟异步操作失败y
      // reject(new Error('Failed to fetch book.'));
    }, 50); 
  });

};
export const register = (info)=>{//info = {name:name,password:password,email:email} 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(true)
    }, 50); 
  });
}
export const getUser = (identity)=>{//identity = {id:id,name:name} 用于查询用户信息，id和name可能只有一个
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟异步操作成功，返回数据
      if(identity.name =='a')
        resolve({... new User(55210919,'ShacooKL','/img/profile.jpg')});
      else
        resolve(null)
      // 或者模拟异步操作失败y
      // reject(new Error('Failed to fetch book.'));
    }, 50); 
  });
}
export const initHomeView = () => {
	// 测试：
	// 模拟异步请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rec = []
      const hot = []
      for(let i=0;i<10;i++){
        rec.push({... new Book(i,  'Book Title'+i, 'Author Name'+i,'/img/cover1.jpg' )})
        hot.push({... new Book( i,  'Book Title'+i, 'Author Name'+i,'/img/bgc1.jpg' )})
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
        collection .push({... new Book(i, 'Book Title'+i, 'Author Name'+i,'/img/bgc3.png' )})
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
        books.push({...new Book(i, 'Book Title'+i, 'Author Name'+i,'/img/bgc2.jpeg' )})
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
        users.push({... new User(i,'user_'+i,'/img/profile.jpg')})
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
      const chapters = []
      for(let i=0;i<100;i++){
        chapters.push({
          id:i,
          order:i,
          title:'第'+i+'次回溯 '
        })
      }
      const book = {... new Book( 
        (Number)(id),
        'Book Title'+id,
       'Author Name'+id,
       '/img/cover1.jpg' ,
        'XX出版社',
        '123456-654321',
        '1979-01-01',
        999,
        999,
        chapters
        )}
      // 模拟异步操作成功，返回数据
      resolve(book);
      // 或者模拟异步操作失败y
      // reject(new Error('Failed to fetch book.'));
    }, 50); // 延迟1秒模拟异步操作
  });

};
export const getChapter = (id) => {
  // 模拟异步请求
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve({... new Chapter(0,'标题','内容内容123456。。。0'.repeat(100))});
    }, 50); // 延迟1秒模拟异步操作
  });
};
export const getComments = (chapterId) => {
  // 模拟异步请求
  return new Promise((resolve, reject) => {
    const comments = []
    for(let i=0;i<10;i++){
      comments.push({... new Comment(i,i,'user_'+i,'好看 爱看 天天看'.repeat(5),i)})
    }
    setTimeout(async () => {
      resolve(comments);
    }, 50); // 延迟1秒模拟异步操作
  });
};
export const getBooks = (searchContent) => {
  // 模拟异步请求
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const books = [];
      for (let i = 0; i < 20; i++) {
        const book = { ... new Book( i, searchContent + ' - '+ i,  'Author'+i, '/img/cover1.jpg' )};
        books.push(book); // 将当前 book 对象推送到 books 数组中
      }
      // 模拟异步操作成功，返回数据
      resolve(books);
     
      //或者模拟异步操作失败
      reject(new Error('Failed to fetch books.'));
    }, 50); // 延迟1秒模拟异步操作
  });
};
export const getExpList = (userId) => {
  // 模拟异步请求
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const list = [];
      for (let i = 0; i < 20; i++) {
        const exp = { ... new ReadingExp(i,"阅读心得_"+i,'',userId,i,'2024/4/14')};
        list.push(exp); // 将当前 book 对象推送到 books 数组中
      }
      // 模拟异步操作成功，返回数据
      resolve(list);
     
      //或者模拟异步操作失败
      reject(new Error('Failed to fetch books.'));
    }, 50); // 延迟1秒模拟异步操作
  });
};
export const getExp = (expId) => {
  // 模拟异步请求
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const exp = { ... new ReadingExp(expId,"阅读心得_"+expId,'# 阅读心得  \n ## 阅读心得  \n  -第一，我不叫喂 \n-第二-从不错判任何一件事\n'.repeat(100),expId,expId,'2024/4/14')};
      // 模拟异步操作成功，返回数据
      resolve(exp);
     
      //或者模拟异步操作失败
      reject(new Error('Failed to fetch books.'));
    }, 50); // 延迟1秒模拟异步操作
  });
};




