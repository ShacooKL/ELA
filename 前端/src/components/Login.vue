<script setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue'
const userStore = useUserStore()
const pwdInput = ref(null)
const closeBtnColor = ref('#ffffffa1')
const error = ref('')
const username = ref('')
const password = ref('')
function toPwd() {
	pwdInput.value.focus()
}
async function login() {
	let result = await userStore.login(username.value, password.value)
	if (result)
		userStore.loginWidowShow = false
	else
		error.value = '登录失败'
}

</script>

<template>
	<Transition name="modal">
		<div v-if="userStore.loginWidowShow" class="modal-mask">
			<div class="login-box">
				<div class="close-btn" @mouseout="closeBtnColor = '#ffffffa1'" @mouseover="closeBtnColor = '#ffffff'"
					@click="userStore.loginWidowShow = false">
					<svg viewBox="0 0 1024 1024">
						<path :fill="closeBtnColor"
							d="M120.526848 193.794048c-20.936704-20.936704-20.936704-53.63712 0-73.265152 19.63008-20.936704 52.330496-20.936704 73.265152 0l710.42048 709.111808c19.63008 20.938752 19.63008 53.635072 0 74.573824-20.938752 19.63008-53.63712 19.63008-74.573824 0L120.526848 193.794048z">
						</path>
						<path :fill="closeBtnColor"
							d="M829.640704 120.528896c20.936704-20.936704 53.635072-20.936704 74.573824 0 19.63008 19.628032 19.63008 52.330496 0 73.265152L193.792 904.214528c-20.934656 19.63008-53.635072 19.63008-73.265152 0-20.936704-20.938752-20.936704-53.635072 0-74.573824L829.640704 120.528896z">
						</path>
					</svg>
				</div>
				<div class="word">Login</div>
				<div class="main">
					<div class="tip">
						用户名
					</div>
					<input v-model="username" @keydown.enter="toPwd">
					<div class="tip">
						密码
					</div>
					<input v-model="password" ref="pwdInput" type="password">
					<button @click="login">登录</button>
					<div class="register">
						<a href="/register" @click="userStore.loginWidowShow=false">创建一个账号</a><span>没有账号？</span>
					</div>
					<div class="error">
						{{ error }}
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style scoped>
.login-box {
	position: fixed;
	top: calc(50% - 200px);
	left: calc(50% - 200px);
	width: 400px;
	height: 400px;
	background-color: #ffffff8a;
	color: azure;
	background-image: url('/img/dark.jpg');
	background-size: cover;
	background-position: 70%;
	box-shadow: 0 0 15px 0 rgb(100, 100, 100);
	;
}

.main {
	display: flex;
	flex-direction: column;
	width: 70%;
	position: absolute;
	left: 15%;
}

.word {
	font-size: 40px;
	text-align: center;
	margin-top: 5px;
}

.tip {
	font-size: 15px;
	margin-top: 20px;
	margin-bottom: 5px;
}

input {
	height: 30px;
	font-size: 15px;
	padding: 5px 10px;
	background-color: #2e2e2e95;
	border: none;
	color: azure;
}

input:focus {
	outline: none;
	;
}

button {
	width: 100%;
	height: 30px;
	border-radius: 10px;
	background-color: #0b819f;
	border: none;
	margin-top: 30px;
	cursor: pointer;
}

button:hover {
	background-color: #0e9bbe;
}

.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	transition: opacity 0.3s ease;
}



.modal-enter-from {
	opacity: 0;
}

.modal-leave-to {
	opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}

.register {
	margin-top: 20px;
	display: flex;
	flex-direction: row-reverse;
}

.register span {
	line-height: 30px;
}

.close-btn {
	width: 20px;
	height: 20px;
	position: absolute;
	top: 20px;
	right: 20px;
	cursor: pointer;
}

.error {
	color: #bd3a3a;
	font-family: '微软雅黑';
	font-size: 15px;
}
</style>