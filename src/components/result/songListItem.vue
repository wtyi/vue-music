<template>
  <div class="songlist_item">
              <div class="songlist-pic">
            <img :src="props.playList.coverImgUrl" alt />
        </div>
        <div class="songList-info">
            <h3>{{props.playList.name}}</h3>
            <div class="metadata">
                <span>{{props.playList.trackCount}}首</span>
                <span>{{formatCount(props.playList.bookCount)}}收藏</span>
                <span>{{formatCount(props.playList.playCount)}}播放</span>
            </div>
        </div>
        <div class="more">
            <span class="iconfont icon-arrow-right"></span>
        </div>
  </div>
</template>

<script>
import formatCount from '@/utils/formatCount.js'
export default {
    props: {
        playList: Object
    },
    setup (props) {
        return {
            props,
            formatCount
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.songlist_item {
    margin-bottom: rem(6);
    padding: rem(3) 0;
    display: flex;
    align-items: center;
    flex: 1;
    height: rem(65);
    .songlist-pic {
        width: 17%;
        img {
            border-radius: 3px;
            width: rem(50);
        }
    }
    .songList-info {
        width: 83%;
        flex: 1;
        margin-left: rem(8);
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        h3 {
            font-size: rem(14);
            @include textOverflow();
        }
        .metadata {
            display: flex;
            align-items: center;
            // justify-content: space-around;
            span {
                font-size: rem(12);
                padding-right: rem(10);
                color: #ddd;
                @include textOverflow();
                &:first-child{
                    width: 20%;
                }
                &:last-child{
                    flex: 1;
                }
            }
        }
    }
    .more{
        span{
            color: #ddd;
            font-size: rem(12);
        }
    }
}
</style>
