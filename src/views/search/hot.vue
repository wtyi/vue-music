<template>
    <div class="search_hot">
        <!-- <h3>热门搜索 : </h3> -->
        <ul>
            <li class="search-hot-item"
             v-for="(hot,index) in props.hotList"
            :key="hot.searchWord"
            @click="searchKeyword(hot)"
            >

                <span class="uuid" :class="{bold:index + 1 <= 3}">{{index + 1}}</span>
                <div class="hot-info">
                    <div class="title">
                        <span class="type1" v-if="hot.iconType == 1">
                            <img :src="hot.iconUrl">
                        </span>
                        <h3>{{hot.searchWord}}</h3>
                        <span class="type5" v-if="hot.iconType == 5">
                            <img :src="hot.iconUrl">
                        </span>
                    </div>
                    <p>{{hot.content}}</p>
                </div>
                <span class="search-count">{{hot.score}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        hotList: Array
    },
    setup (props, { emit }) {
        const searchKeyword = function (hot) {
            emit('changeSearchKeyword', hot.searchWord)
        }
        return {
            props: props,
            searchKeyword
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
h3{
    color: #fff;
}
.search-hot-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: rem(16) 0;
    .uuid{
        width: 10%;
        color: #ddd;
        font-weight: bold;
        font-size: rem(14);
        &.bold{
            color:rgba(246, 103, 105, 1.000);
        }
    }
    .hot-info{
        width: 70%;
        flex: 1;
        .title{
            display: flex;
            // align-items: center;
            span{
                &.type1{
                    padding-right: rem(3);
                    img{
                        width: rem(25);
                    }
                }
                &.type5{
                    padding-left: rem(3);
                    img{
                        width: rem(10);
                    }
                }
            }
        }
        h3{
            font-size: rem(14);
            font-weight: normal;
            padding-bottom: rem(5);
        }
        p{
        padding-top: rem(3);
            font-size: rem(12);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #bbb;
        }
    }
    .search-count{
        width: 20%;
        color: #bbb;
        text-align: center;
        margin-left: rem(5);
    }
}
</style>
