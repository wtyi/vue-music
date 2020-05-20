<template>
  <div class="songlist_item" @click="handleClick">
              <div class="songlist-pic">
            <img :src="playList.coverImgUrl" alt />
        </div>
        <div class="songList-info">
            <h3>{{playList.name}}</h3>
            <div class="metadata">
                <span>{{playList.trackCount}}首</span>
                <span>{{formatCount(playList.bookCount)}}收藏</span>
                <span>{{formatCount(playList.playCount)}}播放</span>
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
    setup (props, { emit }) {
        const handleClick = () => emit('playlist', props.playList)
        return {
            props,
            formatCount,
            handleClick
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
    height: rem(65);
    .songlist-pic {
        width: rem(65);
        img {
            border-radius: 3px;
            width: rem(50);
        }
    }
    .songList-info {
        width: rem(240);
        flex: 1;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        h3 {
            max-width: 60%;
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
        width: rem(30);
        span{
            color: #ddd;
            font-size: rem(12);
        }
    }
}
</style>
