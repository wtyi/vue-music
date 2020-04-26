<template>
<keep-alive>
    <div class="home_page">
        <!-- 首页顶部搜索 -->
        <Head />
        <Album />
        <Recent />
        <PopSinger />
    </div>
</keep-alive>
</template>

<script>
import Head from './head'
import Album from './album.vue'
import Recent from './recent'
import PopSinger from './propsinger'
export default {
    components: {
        Head,
        Album,
        Recent,
        PopSinger
    },
    setup (...props) {
    }
}
</script>

<style lang="scss" scoped>
.home_page {
    background: linear-gradient(to right, rgba(27, 36, 59, 1.000), rgba(23, 23, 37, 1.000));
    padding: 0 20px 100px 20px
}
</style>
