<template>
    <div class="album_item">
        <div class="album-pic">
            <img :src="props.album.picUrl" alt />
        </div>
        <div class="album-info">
            <h3>{{props.album.name}}</h3>
            <div class="metadata">
                <span>{{props.album.artist.name}}</span>
                <span>{{formatTime(props.album.publishTime,"YYYY-MM-DD")}}</span>
            </div>
        </div>
        <div class="more">
            <span class="iconfont icon-arrow-right"></span>
        </div>
    </div>
</template>

<script>
import formatTime from '@/utils/formatTime.js'
export default {
    props: {
        album: Object
    },
    setup (props) {
        return {
            props,
            formatTime
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.album_item {
    margin-bottom: rem(6);
    padding: rem(3) 0;
    display: flex;
    align-items: center;
    flex: 1;
    height: rem(65);
    .album-pic {
        width: 17%;
        img {
            border-radius: 3px;
            width: rem(50);
        }
    }
    .album-info {
        width: 83%;
        flex: 1;
        margin-left: rem(8);
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        h3 {
            font-size: rem(14);
            @include textOverflow()
        }
        .metadata {
            display: flex;
            align-items: center;
            span,p {
                font-size: rem(12);
                padding-right: rem(10);
                color: #ddd;
                @include textOverflow()
            }
        }
    }
}
.more {
    span {
        color: #ddd;
        font-size: rem(13);
    }
}
</style>
