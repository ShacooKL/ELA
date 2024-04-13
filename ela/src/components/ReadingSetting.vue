<template>
	<div class="setting-box" v-if="settingShow">
		<div class="box">
			<div class="word">设置</div>
			<div class="close" @click="settingShow = false">
				<svg viewBox="0 0 1024 1024">
					<path
						d="M512 102.4A409.6 409.6 0 1 0 921.6 512 409.6 409.6 0 0 0 512 102.4z m181.248 518.144a51.2 51.2 0 0 1-72.704 72.704L512 584.192 403.456 693.248a51.2 51.2 0 0 1-72.704-72.704L439.808 512 330.752 403.456a51.2 51.2 0 0 1 72.704-72.704L512 439.808l108.544-109.056a51.2 51.2 0 0 1 72.704 72.704L584.192 512z">
					</path>
				</svg>
			</div>
			<div class="item theme">
				<span>阅读主题</span>
				<button style="background:var(--theme-default);" @click="curTheme = ''"
					:class="{ 'btn-selected': curTheme == '' }"></button>
				<button style="background: var(--theme-dark);" @click="curTheme = 'dark'"
					:class="{ 'btn-selected': curTheme == 'dark' }"></button>
			</div>
			<div class="item font-family">
				<span>正文字体</span>
				<button :class="{ 'btn-selected': curFontFamily == '黑体' }" @click="curFontFamily = '黑体'">黑体</button>
				<button :class="{ 'btn-selected': curFontFamily == '宋体' }" @click="curFontFamily = '宋体'">宋体</button>
				<button :class="{ 'btn-selected': curFontFamily == '楷体' }" @click="curFontFamily = '楷体'">楷体</button>
			</div>
			<div class="item font-size">
				<span>字体大小</span>
				<button @click="curFontSize = curFontSize - 2"><svg viewBox="0 0 1024 1024">
						<path
							d="M228.8 301.9L0 896h96.5l55.8-153.1h255.4L463.4 896h97.3L332 301.9H228.8zM179.7 668l99-268.8h3.3L380.2 668H179.7zM602.4 643.9h420.1v73.2H602.4z">
						</path>
					</svg>
				</button>
				<button>{{ curFontSize }}</button>
				<button @click="curFontSize = curFontSize + 2">
					<svg viewBox="0 0 1024 1024">
						<path
							d="M228.8 301.9L0 896h96.5l55.8-153.1h255.4L463.4 896h97.3L332 301.9H228.8zM179.7 668l99-268.8h3.3L380.2 668H179.7zM849.5 643.9V470.8h-73.3v173.1H602.4v73.2h173.8V891h73.3V717.1h173v-73.2z">
						</path>
					</svg>
				</button>
			</div>
			<div class="item width">
				<span>页面宽度</span>
				<button @click="width = '60%'" :class="{ 'btn-selected': width == '60%' }">自动</button>
				<button @click="width = '640px'" :class="{ 'btn-selected': width == '640px' }">640</button>
				<button @click="width = '800px'" :class="{ 'btn-selected': width == '800px' }">800</button>
				<button @click="width = '900px'" :class="{ 'btn-selected': width == '900px' }">900</button>
				<button @click="width = '1000px'" :class="{ 'btn-selected': width == '1000px' }">1000</button>
				<button @click="width = '1200px'" :class="{ 'btn-selected': width == '1200px' }">1280</button>
			</div>
		</div>
	</div>

</template>


<script setup>
import { watch } from 'vue'
const settingShow = defineModel('settingShow')

const curTheme = defineModel('theme')
const curFontFamily = defineModel('fontFamily')
const curFontSize = defineModel('fontSize')
const width = defineModel('width')
watch(curFontSize,(newSize) => { 
	if(newSize<12)
		curFontSize.value=12
	else if(newSize>40)
		curFontSize.value=40
})


</script>

<style scoped>
.setting-box {
	width: 400px;
	height: 400px;
	position: absolute;
	height: 100%;
	right: 20px;
	top: 0;
}

.box {
	width: 400px;
	height: 400px;
	background-color: var(--lighter-1);
	position: sticky;
	top: 35vh;
	box-shadow: 0 0 15px 0 var(--color-shadow);
	border-radius: 10px;
	display: flex;
	padding-left: 20px;
	flex-direction: column;
}

.word {
	color: var(--text-dark);
	font-size: 22px;
	margin-top: 20px;

}

.close {
	fill: var(--color-btn-close-hover);
	position: absolute;
	right: 20px;
	top: 20px;
	cursor: pointer;
}

.close:hover {
	fill: var(--color-btn-colse);
}

span {
	margin-right: 20px;
	font-size: 12px;
	color: var(--text-dark-2);
}

.item {
	margin-top: 20px;
	font-size: 15px;
	display: flex;
	flex-direction: row;
	align-items: center;
}

button {
	border: 0.1px solid var(--color-shadow);
	border-radius: 5px;
	background-color: var(--color-btn);
	cursor: pointer;
}

button:hover {
	background-color: #eac1c17c;
	color: var(--fill-2);
}

.btn-selected {
	color: var(--fill-2);
	border: 0.1px solid var(--fill-2);
}

.theme button {
	width: 37px;
	height: 37px;
	background-color: red;
	border-radius: 50%;
	margin-left: 10px;
}

.theme button:hover {
	border: 0.1px solid var(--fill-2);
}


.font-family button {
	margin-left: 10px;
	width: 80px;
	height: 35px;
}



.font-size button {
	width: 80px;
	height: 40px;
}

.font-size button:nth-child(2) {
	margin-left: 10px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border-right: none;
}

.font-size button:nth-child(3) {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-right: none;
	border-left: none;
	font-size: 20px;
	padding-top: 5px;
	font-weight: bolder;
	color: rgba(118, 118, 118, 0.562);
	cursor: default;
}

.font-size button:nth-child(4) {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-left: none;
}

.font-size svg {
	fill: var(--fill-1);
}

.font-size button:hover {
	background-color: var(--color-btn);
}

.font-size button:hover svg {
	fill: var(--fill-2);
	;
}

.width button {
	width: 40px;
	height: 40px;
	margin-left: 10px;

}


svg {
	width: 30px;
	height: 30px;
}
</style>