<template>
    <div class="song-item">
        <div class="song-avatar">
            <img :src="song.al.picUrl" alt />
        </div>
        <div class="song-info">
            <div class="song-name">
                <span>{{song.name}}</span>
            </div>
            <div class="song-singers">
                <p>{{formatSinger(song.ar)}} . {{song.al.name}}</p>
            </div>
        </div>
        <div class="song-time">
            <span>{{formatSongtime(song.dt)}}</span>
        </div>
    </div>
</template>

<script>
import formatSinger from '@/utils/formatSinger.js'
import formatSongtime from '@/utils/formatSongtime.js'
export default {
    props: {
        song: Object
    },
    setup (props) {
        return {
            formatSinger,
            formatSongtime,
            song: props.song
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.song-item{
    color: #333;
    display: flex;
    align-items: center;
    padding: rem(10) rem(2);
    border-bottom: 1px solid rgba(238,238,238,.5);
}
    .song-avatar{
        img{
            width: rem(45);
            height: rem(45);
            border-radius: 50%;
        }
    }
    .song-info{
        flex: 1;
        padding: 0 rem(15);
        .song-name{
            font-weight: 500;
            color: black;
            font-size: rem(14);
            padding: rem(5) 0;
            max-width: rem(200);
            span{
                color: #222;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                display: -webkit-box;
            }
        }
        .song-singers{
            p{
                display: inline-block;
                font-size: rem(12);
                color: #999;
                transform: scale(.8);
                position: relative;
                top: 0;
                left: rem(-20);
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                display: -webkit-box;
            }
        }
    }
    .song-time{
        span{
            font-size: rem(13);
            color: #222;
            font-weight: 600;
        }
    }
</style>
