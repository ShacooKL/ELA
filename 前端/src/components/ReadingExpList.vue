<template>
  <el-table  :data="readingStore.exps" style="width: 100%">
    <el-table-column label="Date" prop="postDate" width="180"/>
    <el-table-column label="书籍ID" prop="date" width="180"/>
    <el-table-column label="Title" prop="title">
      <template #default="scope">
        <RouterLink :to="{name:'readingExpItem',params:{expId:scope.row.id}}">{{ scope.row.title }}</RouterLink>
      </template>

    </el-table-column>>

    <el-table-column align="right">
      <template #header>
        <el-input  size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          v-if="userStore.id.toString() ==  route.params.id"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useReadingStore } from '@/stores/reading';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
const route = useRoute()
const userStore = useUserStore()
const readingStore =useReadingStore()
interface User {
  date: string
  name: string
  address: string
}





</script>