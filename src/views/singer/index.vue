<template>
<!-- 歌手单曲 -->
  <div class="singer_page">
      <Head @onBack="routerBack" />
      <Info :singerInfo='singerInfo' />
      <Foot :songList="songList" @onPlay="playSong" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Head from './head'
import Info from './info'
import Foot from './foot'
import { getSingerSongs } from '@/request/api.js'
import { setSongList, setPlaySong } from '@/utils/music/index'
import { useRouter, useRoute } from 'vue-router'
export default {
    components: {
        Head,
        Info,
        Foot
    },
    setup (props, ctx) {
        const router = useRouter()
        const route = useRoute()
        const songList = ref([])
        const singerInfo = ref({})
        const routerBack = function () {
            router.history.go(-1)
        }
        const playSong = function (song) {
            setPlaySong(song)
            setSongList(songList)
        }
        onMounted(() => {
            const { id } = route.params
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
