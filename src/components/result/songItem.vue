<template>
    <div class="song_item" v-if="props.song" @click="handleClick">
        <div class="song-pic" v-if="props.showPic && props.song.al">
            <img :src="props.song.al.picUrl" alt />
        </div>
        <div class="song-info" :style="songInfoStyle">
            <h3>{{props.song.name}}</h3>
            <p>{{formatSinger(props.song.ar || props.song.artists)}} - {{props.song.al ? props.song.al.name : props.song.album.name}}</p>
        </div>
        <div class="play">
            <span class="iconfont icon-play"></span>
        </div>
    </div>
</template>

<script>
import formatSinger from '@/utils/formatSinger.js'
export default {
    props: {
        song: {
            type: Object
        },
        showPic: {
            type: Boolean,
            default: true
        }
    },
    setup (props, { emit }) {
        const handleClick = () => emit('song', props.song)
        const songInfoStyle = {}
        // props.showPic && props.song.al ? { width: '70%' } : { width: '80%' }
        return {
            props,
            formatSinger,
            handleClick,
            songInfoStyle
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.song_item {
    display: flex;
    width: 100%;
    padding: rem(10) 0;
    height: 1.5rem;
    align-items: center;
    justify-content: space-between;
    .song-pic{
        width: rem(60);
        img{
            width: 90%;
        }
    }
    .song-info{
        width: rem(240);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        h3,p{
            @include textOverflow;
            font-size: rem(14);
        }

        p{
            font-size: rem(12);
            color: #ddd;
        }
    }
    .play{
        width: rem(25);
        text-align: right;
        float: right;
        span{
            font-size: rem(22);
            color: #aaa;
        }
    }
}
</style>
