<template>
  <div class="album_page">
     <AlbumHead :albumData="albumData" />
     <AlbumSongs :albumData="albumData" />
  </div>
</template>

<script>
import AlbumHead from './head'
import AlbumSongs from './song'
import { onMounted, reactive } from 'vue'
import { getAlbumInfo } from '@/request/api.js'
import { useRoute } from 'vue-router'
export default {
    components: {
        AlbumHead,
        AlbumSongs
    },
    setup () {
        const route = useRoute()
        const albumData = reactive({
            songs: [],
            album: {},
            info: {}
        })
        onMounted(() => {
            getAlbumInfo(route.params.id).then(([result, info]) => {
                albumData.songs = result.songs
                albumData.album = result.album
                albumData.info = info
            })
        })
        return {
            albumData
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
