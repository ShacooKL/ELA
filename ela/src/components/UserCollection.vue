<template>
	
	<BookItem  v-for = "book in bookStore.collection" v-bind="book" :card="false"/>
</template>
<script setup>
import BookItem from './BookItem.vue'
import { useBookStore } from '@/stores/book'
const bookStore = useBookStore()
defineProps({
	userId:Number
})

</script>
<style scoped>

</style>