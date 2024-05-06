class Book {
	constructor(id = 0, title = '', author = '', cover = '',
		publisher = '', ISBN = '', publish_date = '', like_count = 0, download_count = 0, chapters = [new Chapter()]) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.cover = cover;
		this.publisher = publisher;
		this.ISBN = ISBN;
		this.publish_date = publish_date;
		this.like_count = like_count;
		this.download_count = download_count;
		this.chapters = chapters;
	}
}
class Chapter {
	constructor(id = 0, title = '', content = '') {
		this.id = id
		this.title = title
		this.content = content
	}
}
class Comment {
	constructor(commentId = 0, userId = 0, userName = '', content = '', likes = 0) {
		this.commentId = commentId
		this.userId = userId
		this.userName = userName
		this.content = content
		this.likes = likes
	}
}
class User {
	constructor(id = 0, name = '', email = '', avatar = '') {
		this.id = id
		this.name = name
		this.email = email
		this.avatar = avatar
	}
}
class ReadingExp {
	constructor(id = 0, title = '', content = '', authorId = 0,bookId=0,postDate="") {
		this.id = id
		this.title = title
		this.content = content
		this.authorId = authorId
		this.postDate = postDate
		this.bookId = bookId
	}
}
export default { Comment, Chapter, Book, User, ReadingExp }
