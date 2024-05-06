<template>

    <div class="r-box">
        <div class="pos"></div>
        <div class="main" :style="{ width: mainWidth }">
            <div class="chapter" v-if="chapterShow">
                章节
                <div class="list">
                    <router-link  v-for="chapter in readingStore.book.chapters" :to="'/reading/' + chapter.id">{{ chapter.title }}</router-link>
                </div>
            </div>
            <div class="content" :style="{ fontFamily: curFontFamily, fontSize: curFontSize + 'px' }">
                {{  readingStore.chapter.content }}
            </div>

            <ReadingSetting v-model:settingShow="settingShow" v-model:theme="curTheme"
                v-model:fontFamily="curFontFamily" v-model:fontSize="curFontSize" v-model:width="mainWidth" />
        </div>
        <Transition>
            <CommentArae />
        </Transition>
        <ReadingSideBar v-model:theme="curTheme" v-model:settingShow="settingShow" v-model:chapterShow="chapterShow" />
    </div>

</template>

<script setup>
import { ref, watch } from 'vue'
import CommentArae from '@/components/CommentArae.vue'
import ReadingSideBar from '@/components/ReadingSideBar.vue'
import ReadingSetting from '@/components/ReadingSetting.vue'
import { useReadingStore } from '@/stores/reading'
import { onBeforeRouteUpdate } from 'vue-router'
const readingStore = useReadingStore()

const curTheme = ref('')
const curFontFamily = ref('黑体')
const curFontSize = ref(20)
const initWidth = '60%'
const mainWidth = ref(initWidth)
const content = ref(' 我是无敌暴龙战神 '.repeat(5000))
const settingShow = ref(false)
const chapterShow = ref(false)
watch(curTheme, (newTheme) => {
    if (newTheme == 'dark') {
        document.documentElement.setAttribute('data-theme', "dark");
    }

    else {
        document.documentElement.setAttribute('data-theme', "");
    }
})
onBeforeRouteUpdate(async(to, from) => {
    readingStore.commentShow=false
    chapterShow.value=false
})

</script>

<style scoped>
.pos {
    width: 100px;
    flex-shrink: 0;
}

.r-box {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    min-width: 100%;
    min-height: 100%;
    background-color: var(--bgc-1);
}

.main {
    min-height: 1000px;
    min-height: 2000px;
    flex-shrink: 0;
    min-width: 0px;
    background-color: var(--page-1);
    position: relative;
}

.content {
    word-wrap: break-word;
    padding: 50px;
    line-height: 2.5em;
    letter-spacing: 0.2em;
    color: var(--text-dark);
}

.chapter {
    background-color: var(--page-1);
    color: var(--text-dark);
    height: 100vh;
    width: 100%;
    position: sticky;
    top: 0px;
    font-size: 30px;
    padding: 40px;
    box-sizing: border-box;
    overflow-y: scroll;
}

.list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
}

.list a {
    height: 40px;
    width: 50%;
    line-height: 40px;
    border-radius: 15px;
    padding-left: 10px;
    box-sizing: border-box;
    color: var(--text-dark);
    font-size: 16px;
    margin-bottom: 15px;
}

.list a:hover {
    background-color: var(--color-hover-chapter);
}

.setting {
    position: absolute;
}

.v-enter-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

/* 修改滚动条的样式 */
::-webkit-scrollbar {
    width: 12px;
    /* 设置滚动条宽度 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    background-color: #838383;
    /* 滚动条滑块颜色 */
    border-radius: 5px;
    /* 滚动条滑块圆角 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: #eeeeee00;
    /* 滚动条轨道颜色 */
}

/* 鼠标悬停在滚动条上的样式 */
::-webkit-scrollbar-thumb:hover {
    background-color: rgb(118, 118, 118)
}
</style>
