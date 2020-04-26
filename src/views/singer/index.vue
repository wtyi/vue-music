<template>
<!-- 歌手单曲 -->
  <div class="singer_page">
      <Head @onBack="routerBack" />
      <Info :singerInfo='singerInfo' />
      <Foot :songList="songList" @onPlay="playSong" />
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue'
import Head from './head'
import Info from './info'
import Foot from './foot'
import { getSingerSongs } from '@/request/api.js'
import { setSongList, setPlaySong } from '@/utils/music/index'
export default {
    components: {
        Head,
        Info,
        Foot
    },
    setup (props, ctx) {
        const vm = getCurrentInstance()
        const context = vm.ctx
        const $router = context.$router
        const songList = ref([])
        const singerInfo = ref({})
        const routerBack = function () {
            $router.push({ name: 'Home', params: {} })
        }
        const playSong = function (song) {
            setPlaySong(song)
            setSongList(songList)
        }
        onMounted(() => {
            const route = $router.currentRoute
            const { id } = route.value.params
            // 获取歌手全部单曲
            getSingerSongs(id).then(({ hotSongs, artist }) => {
                songList.value = hotSongs
                singerInfo.value = artist
            })
        })
        return {
            songList,
            singerInfo,
            routerBack,
            playSong
        }
    }
}
</script>

<style lang="scss" scoped>
.singer_page{
    // background-color: rgb(56, 24, 163);
}
</style>
