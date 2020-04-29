<template>
    <div id="layout">
        <keep-alive>
            <router-view :include="['Home']" />
        </keep-alive>
        <!-- 歌曲列表 当前播放歌曲ID -->
        <MusicModal :state="state" />
        <Loading :show="showLoading" />
        <audio :src="state.audioUrl" ref="audio" preload style="display:none"></audio>
    </div>
</template>
<script>
import MusicModal from '@/components/musicModal/index.vue'
import Loading from '@/components/loading/index.vue'
import { ref, onMounted } from 'vue'
import { setAudio, state } from '@/core/music/index.js'
export default {
    components: {
        MusicModal,
        Loading
    },
    setup (props, ctx) {
        const showLoading = ref(true)
        const audio = ref(null)

        onMounted(() => {
            window.onload = function () {
                showLoading.value = false
            }
            setAudio(audio)
        })
        return {
            showLoading,
            audio,
            state
        }
    }
}
</script>
<style lang="scss">
@import url(./assets/scss/reset.scss);
@import url(./assets/scss/global.scss);

#layout {
    width: 100%;
    min-height: 100vh;
    & > div {
        width: 100%;
        min-height: 100vh;
    }
}
</style>
