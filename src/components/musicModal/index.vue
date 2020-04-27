<template>
    <div class="music_modal" :style="defaultStyle" v-hammer:swipe.down="hideMusicModal">
        <div class="song">
            <span>{{state.playSong && state.playSong.name}} - {{computedSingers(state.playSong && state.playSong.ar)}}</span>
        </div>
        <div class="music-menu">
            <div class="left">
                <span class="iconfont icon-while" :class="loopStyle" @click="setPlayMode('loop')"></span>
            </div>
            <div class="middle">
                <span class="iconfont icon-prev" @click="playPrevSong"></span>
                <span class="iconfont icon-stop" @click="pauseSong" v-if="state.status"></span>
                <span class="iconfont icon-start" @click="playSong" v-else></span>
                <span class="iconfont icon-prev" @click="playNextSong"></span>
            </div>
            <div class="right">
                <span class="iconfont icon-line" :class="randomStyle" @click="setPlayMode('random')"></span>
            </div>
        </div>
        <div class="progress">
            <div class="line-bottom" ref="progressBottomLine" >
                <div class="line-top" :style="progressStyle"></div>
                <div class="btn" ref="progressBtn" :style="btnStyle" v-hammer:pan="moveEvents"></div>
            </div>
        </div>
        <!-- 当播放状态 隐藏 显示这个按钮 -->
        <div class="showMusicModal" :class="showMusicModalStyle">
            <span class="iconfont icon-shandian" @click="showMusicModal"></span>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import useMove from './index.js'
import * as musicMethods from '@/utils/music/index.js'
export default {
    props: {
        state: {
            type: Object,
            default: () => ({
                name: '获取中...',
                ar: []
            })
        }
    },
    setup (props, ctx) {
        const computedSingers = function (ar) {
            if (ar && ar.length === 1) {
                return ar[0].alia ? ar[0].alia[0] : ar[0].name
            } else if (ar && ar.length > 1) {
                let str = ''
                const names = ar.map(a => {
                    if (a.alia && a.alia[0]) {
                        return a.alia[0]
                    } else {
                        return a.name
                    }
                })
                str = names.join('/')
                return str
            }
        }
        const defaultStyle = computed(() => {
            return props.state.showModal ? { transform: 'translateY(0%)' } : { transform: 'translateY(100%)' }
        })

        const progressStyle = computed(() => {
            return { width: `${props.state.time}%` }
        })

        const btnStyle = computed(() => {
            return { left: `${props.state.time}%` }
        })

        const loopStyle = computed(() => {
            return { active: props.state.mode === 'loop' }
        })
        const randomStyle = computed(() => {
            return { active: props.state.mode === 'random' }
        })

        const showMusicModalStyle = computed(() => {
            return {
                show: props.state.status && !props.state.showModal,
                hide: !props.state.status || (props.state.status && props.state.showModal)
            }
        })

        const playSong = function () {
            musicMethods.changePlayStatus(true)
        }

        const pauseSong = function () {
            musicMethods.changePlayStatus(false)
        }
        const playNextSong = function () {
            musicMethods.playNextSong && musicMethods.playNextSong()
        }

        const playPrevSong = function () {
            musicMethods.playPrevSong && musicMethods.playPrevSong()
        }

        const hideMusicModal = function () {
            props.state.showModal && musicMethods.setShowMusicModal(false)
        }

        const showMusicModal = function () {
            !props.state.showModal && musicMethods.setShowMusicModal(true)
        }

        const setPlayMode = function (mode) {
            musicMethods.setPlayMode(mode)
        }

        const {
            progressBottomLine,
            progressBtn,
            moveStart, moveLeave, moveEnd
        } = useMove(musicMethods)

        const moveEvents = [moveStart, moveLeave, moveEnd]

        return {
            state: props.state,
            computedSingers,
            hideMusicModal,
            showMusicModal,
            setPlayMode,
            defaultStyle,
            playSong,
            pauseSong,
            playNextSong,
            playPrevSong,
            progressStyle,
            btnStyle,
            loopStyle,
            randomStyle,
            showMusicModalStyle,
            moveEvents,
            progressBottomLine,
            progressBtn
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
$leftColor: rgba(115, 36, 245, 1);
$rightColor: rgba(54, 114, 241, 1);
.music_modal {
    // box-sizing: content-box;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: rem(130);
    padding: rem(20);
    background-color: rgba(42, 46, 74, 1);
    border-top-left-radius: rem(25);
    border-top-right-radius: rem(25);
    min-height: rem(60) !important;
    transform: translateY(100%);
    transition: transform .5s;
}

.song{
    text-align: center;
    padding-bottom: 10px;
}

.music-menu {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 5px 0;
    & > div {
        width: 28%;
        text-align: center;
    }
    .middle {
        width: 44%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            font-size: rem(20);
            &:last-child {
                transform: rotate(180deg);
            }
        }
    }
    .left,
    .right {
        span {
            font-size: rem(18);
            color: #999;
            &.active{
                color: white!important;
            }
        }
    }
}

.progress {
    padding: 20px 0;
    .line-bottom,
    .line-top {
        width: 100%;
        height: 6px;
        border-radius: 5px;
    }

    .line-bottom {
        position: relative;
        background-color: rgba(60, 61, 81, 1);
    }
    .line-top {
        // transform: translateX(-80%);
        width: 10%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(to right, $leftColor, $rightColor);
    }
    .btn {
        width: 12px;
        height: 12px;
        margin-left: -6px;
        background-color: $rightColor;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 0%;
        z-index: 3;
        transform: translateY(-50%);
    }
}

.showMusicModal{
    position: fixed;
    right: rem(13);
    bottom: 35vh;
    transition: transform .6s;
    &.show{
        transform: translateX(0%)!important;
    }
    &.hide{
        transform: translateX(200%);
    }
    span{
        font-size: rem(25);
        color: violet;
        font-weight: bold;
    }
}
</style>
