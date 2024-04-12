<template>

		<div class="c-box" v-if="readingStore.commentShow">
			<div class="c-top">
				<div class="word">
					评论
				</div>
				<div class="comments-num ">
					<span>{{ readingStore.comments.length }}</span><span>条</span>
				</div>

			</div>
			<div class="c-comments">
				<Comment v-for="comment in readingStore.comments" v-bind="comment" />
				
			</div>
			<div class="c-bottom">
				<CommentInput class="comment-input" />
			</div>

		</div>

</template>
<script setup>
import {useReadingStore} from '@/stores/reading'
import Comment from '@/components/Comment.vue'
import CommentInput from '@/components/CommentInput.vue'
const readingStore = useReadingStore()

</script>

<style scoped>
.c-box {
	position: sticky;
	height: 100vh;
	top: 0px;
	width: var(--width-comment);
	background-color: var(--page-1);
	display: flex;
	flex-direction: column;
	border-left: 0.5px solid var(--divider);
}

.c-top {
	min-height: 80px;
	width: var(--width-comment);
	background-color: var(--page-1);
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: end;
	margin-bottom: 10px;
}

.c-comments {
	flex-grow: 1;
	width: var(--width-comment);
	background-color: var(--page-1);
	overflow-y: auto;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
	position: relative;
}

.c-bottom {
	width: var(--width-comment);

	display: flex;
	align-items: start;
	justify-content: center;
	flex-shrink: 0;
	min-height: 120px;
	border-top: var(--divider)0.5px solid;

}

.comment-input {
	width: 80%;
}

.word {
	font-size: 22px;
	color: var(--text-dark);
	margin-left: 10px;
	font-family: 微软雅黑;
}

.comments-num {
	margin-right: 10px;
	color: #f0ffff;
	margin-left: 8px;
}
.comments-num span{
	font-size: 14px;
	margin-left: 2px;
	color: var(--text-dark-2);
}
span{
	color: var(--text-dark);

}
/* 修改滚动条的样式 */
.c-box ::-webkit-scrollbar {
    width: 8px; /* 设置滚动条宽度 */
}

/* 滚动条滑块 */
.c-box ::-webkit-scrollbar-thumb {
    background-color: #838383; /* 滚动条滑块颜色 */
    border-radius: 5px; /* 滚动条滑块圆角 */
}

/* 滚动条轨道 */
.c-box ::-webkit-scrollbar-track {
    background-color: #eeeeee00; /* 滚动条轨道颜色 */
}

/* 鼠标悬停在滚动条上的样式 */
.c-box ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(118, 118, 118)
}

</style>
<style>

</style>