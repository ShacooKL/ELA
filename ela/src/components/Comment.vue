<template>

<div class="comment-box">
    <div class="avatar">

    </div>
    <div class="main">
        <div class="content">

        </div>
        <div class="footer">

        </div>
    </div>
</div>

</template>

<script setup>

</script>

<style scoped>
.comment-box{
    height: 100px;
    min-width: 200px;
    display: flex;
}
.avatar{
    height: 100px;
    width: 30px;
    background-color: rgb(43, 155, 163);
}
.main{
    flex-grow: 1;
    height: 100px;
    display: flex;
    flex-direction: column;
}
.content{
    flex-grow: 1;
    background-color: #5aa35e;
}
.footer{
    height: 20px;
    background-color: #773f3f;
}
</style>