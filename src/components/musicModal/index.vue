<template>
    <div class="modal">
        <div
            class="music_modal"
            :style="defaultStyle"
            v-hammer:swipe.down="hideMusicModal"
            v-hammer:swipe.up="showMaxModal"
        >
            <div class="song">
                <i class="iconfont icon-prev"></i>
                <span>{{state.playSong && state.playSong.name}} - {{formatSinger(state.playSong && (state.playSong.ar || state.playSong.artists))}}</span>
                <i class="iconfont icon-prev"></i>
            </div>
            <div class="music-menu">
                <div class="left">
                    <span
                        class="iconfont icon-while"
                        :class="loopStyle"
                        @click="setPlayMode('loop')"
                    ></span>
                </div>
                <div class="middle">
                    <span class="iconfont icon-prev" @click="playPrevSong"></span>
                    <span class="iconfont icon-stop" @click="pauseSong" v-if="state.status"></span>
                    <span class="iconfont icon-start" @click="playSong" v-else></span>
                    <span class="iconfont icon-prev" @click="playNextSong"></span>
                </div>
                <div class="right">
                    <span
                        class="iconfont icon-line"
                        :class="randomStyle"
                        @click="setPlayMode('random')"
                    ></span>
                </div>
            </div>
            <div class="progress">
                <div class="line-bottom" ref="progressBottomLine">
                    <div class="line-top" :style="progressStyle"></div>
                    <div class="btn" ref="progressBtn" :style="btnStyle" v-hammer:pan="moveEvents"></div>
                </div>
            </div>
            <!-- 当播放状态 隐藏 显示这个按钮 -->
            <div class="showMusicModal" :class="showMusicModalStyle">
                <span class="iconfont icon-shandian" @click="showMusicModal"></span>
            </div>
        </div>
        <div :style="playMusicPageStyle" style="z-index:11;transition:all .3s ease;position: fixed;left: 0; bottom: 0;width:100%;height:100vh;">
            <div class="mask" style="position:absolute;top:0vh;left:0;width:100%;height:100vh;z-index:-1;"></div>
            <PlayMusicPage :state="state"  @hide="handleHideMaxMusic" />
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import PlayMusicPage from './play.vue'
import useMove from './index.js'
import * as musicMethods from '@/core/music/index.js'
import formatSinger from '@/utils/formatSinger'

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
    components: {
        PlayMusicPage
    },
    setup (props, ctx) {
        const defaultStyle = computed(() => {
            return props.state.showModal
                ? { transform: 'translateY(0%)' }
                : { transform: 'translateY(100%)' }
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
                show: props.state.status && !props.state.showModal && showMaxMusicModal.value !== true,
                hide:
                    !props.state.status ||
                    (props.state.status && props.state.showModal)
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
            if (showMaxMusicModal.value) {
                return false
            }
            !props.state.showModal && musicMethods.setShowMusicModal(true)
        }

        const setPlayMode = function (mode) {
            musicMethods.setPlayMode(mode)
        }

        const {
            progressBottomLine,
            progressBtn,
            moveStart,
            moveLeave,
            moveEnd
        } = useMove(musicMethods)

        const moveEvents = [moveStart, moveLeave, moveEnd]

        /**
         * 新增 全屏播放页
         */
        const showMaxMusicModal = ref(false)
        const showMaxModal = () => {
            showMaxMusicModal.value = true
            document.body.style.overflow = 'hidden'
            hideMusicModal()
        }
        const handleHideMaxMusic = () => {
            showMaxMusicModal.value = false
            document.body.style.overflow = 'auto'
            showMusicModal()
        }
        const playMusicPageStyle = computed(() => {
            return showMaxMusicModal.value ? { transform: 'translateY(0%)' } : { transform: 'translateY(100%)' }
        })
        return {
            state: props.state,
            formatSinger,
            hideMusicModal,
            showMusicModal,
            showMaxModal,
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
            progressBtn,
            handleHideMaxMusic,
            playMusicPageStyle
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
$leftColor: rgba(115, 36, 245, 1);
$rightColor: rgba(54, 114, 241, 1);
.modal{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    min-height: 0!important;
}
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
    transition: transform 0.5s;
    z-index: 3;
}

.song {
    text-align: center;
    padding-bottom: 10px;
    display: flex;
    span{
        flex: 1;
    }
    i:nth-child(1){
        transform: rotate(90deg);
        display: inline-block;
        animation: moveTap1 1s infinite linear;
         @keyframes moveTap1 {
            0%{
                transform: rotate(90deg) translateX(0);
                opacity: 1;
            }
            100%{
                transform: rotate(90deg) translateX(-20px);
                opacity: 0;
            }
        }
    }
    i:nth-child(3){
        transform: rotate(270deg);
        display: inline-block;
        animation: moveTap2 1s infinite linear;
         @keyframes moveTap2 {
            0%{
                transform: rotate(270deg) translateX(0);
                opacity: 1;
            }
            100%{
                transform: rotate(270deg) translateX(-20px);
                opacity: 0;
            }
        }
    }
    i{
        color: #fff;
        opacity: .2;
    }

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
            &.active {
                color: white !important;
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

.showMusicModal {
    position: fixed;
    right: rem(13);
    bottom: 35vh;
    transition: transform 0.6s;
    &.show {
        transform: translateX(0%) !important;
    }
    &.hide {
        transform: translateX(200%);
    }
    span {
        font-size: rem(25);
        color: violet;
        font-weight: bold;
    }
}
</style>
