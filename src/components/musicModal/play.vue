<template>
    <div class="play_page">
        <div class="line-btn" v-hammer:swipe.down="handleHideThis">
            <span></span>
        </div>
        <div class="content">
            <div class="song">
                <div class="song-pic" v-if="state.playSong" :style="{backgroundImage:`url(${state.playSong.al.picUrl})`}">
                    <div class="progressLine">
                        <svg viewBox="0 0 100 100">
                            <path
                                d="
        M 50 50
        m 0 -47
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        "
                                stroke="#7324f5"
                                fill="none"
                                stroke-linecap="round"
                                stroke-width="1.8"
                                :style="progressLineSvgPathStyle"
                            />
                        </svg>
                        <!-- transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s; -->
                    </div>
                </div>
            </div>
            <div class="song-info" v-if="state.playSong">
                <h1>{{state.playSong.name || '-'}}</h1>
                <span>{{state.playSong.ar[0].name}}</span>
            </div>
            <div class="btn">
                <div class="prev">
                    <span class="iconfont icon-prev" @click="handlePlayPrevSong"></span>
                </div>
                <div class="play">
                    <span class="iconfont icon-play" v-if="!state.status" @click="handlePlaySong"></span>
                    <span class="iconfont icon-stop" v-else @click="handlePauseSong"></span>
                </div>
                <div class="next">
                    <span class="iconfont icon-prev" @click="handlePlayNextSong"></span>
                </div>
            </div>
            <div class="menu">
                <span class="iconfont icon-while" @click="setPlayMode('loop')" :class="{'active':state.mode == 'loop'}"></span>
                <span class="iconfont icon-line" @click="setPlayMode('random')" :class="{'active':state.mode == 'random'}"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import * as musicMethods from '@/core/music/index.js'
export default {
    props: {
        state: Object,
        show: Boolean
    },
    setup (props, { emit }) {
        const handleHideThis = () => {
            emit('hide')
        }
        const progressLineSvgPathStyle = computed(() => {
            return {
                'stroke-dasharray': 3 * props.state.time + 'px,300px'
            }
        })
        const handlePlayPrevSong = () => musicMethods.playPrevSong()
        const handlePlayNextSong = () => musicMethods.playNextSong()
        const handlePlaySong = () => musicMethods.changePlayStatus(true)
        const handlePauseSong = () => musicMethods.changePlayStatus(false)
        const setPlayMode = function (mode) {
            musicMethods.setPlayMode(mode)
        }
        return {
            handleHideThis,
            progressLineSvgPathStyle,
            handlePlayPrevSong,
            handlePlayNextSong,
            handlePlaySong,
            handlePauseSong,
            setPlayMode
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.play_page {
    width: 100%;
    height:100%;
    background: linear-gradient(
        to right,
        rgba(27, 36, 59, 1),
        rgba(23, 23, 37, 1)
    );
    // background-color: white;

    border-top-left-radius: rem(28);
    border-top-right-radius: rem(28);
    padding: rem(0) rem(20) rem(8) rem(20);
    z-index: 10;
}
.line-btn {
    text-align: center;
    padding: rem(10) 0;
    height: 10vh;
    span {
        display: inline-block;
        width: 40%;
        height: rem(3);
        border-radius: rem(10);
        background-color: #ddd;
    }
}
.content {
    height: 80vh;
}
.song {
    display: flex;
    // align-items: center;
    justify-content: center;
    height: 35vh;
}
.song-pic {
    width: 50vw;
    height: 50vw;
    background-image: url(https://p2.music.126.net/WPHmBisDxnoF4DrBLKwl3Q==/109951163169021112.jpg);
    background-size: cover;
    border-radius: 50%;
    position: relative;
    .progressLine {
        width: 100%;
        height: 100%;
        transform: scale(1.3);
        border-radius: 50%;
        border: 1px solid #aaa;
        svg {
            // width: 100%;
            // height: 100%;
            transform: scale(1.07);
            path {
                stroke-dasharray: 0px, 800px;
                stroke-dashoffset: 0px;
            }
        }
    }
}

.song-info{
    text-align: center;
    h1{
        padding: rem(10);
        font-size: rem(18);
    }
    span{
        color: #ddd;
    }
}
.btn{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30vh;
    div{
        padding: rem(12) rem(20);
        &:last-child{
            transform: rotateZ(180deg);
        }
        span{
            font-size: rem(30);
            color: #ddd;
        }
    }
}
.menu{
    display: flex;
    align-items: center;
    justify-content: center;
    span{
        font-size: rem(18);
        color: #777;
        padding: rem(10);
        &.active{
            color: white;
        }
    }
}
</style>
