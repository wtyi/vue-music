<template>
  <div class="playlist_page">
      <PlaylistHead :playlistInfo='playlistInfo' />
      <PlaylistSong :playlistInfo='playlistInfo' />
      <div v-show="showLoading">
          <Loading />
      </div>
  </div>
</template>

<script>
import PlaylistHead from './head'
import PlaylistSong from './song'
import Loading from '@/components/loading/search'
import { getPlaylistInfo } from '@/request/api.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
    components: {
        PlaylistSong,
        PlaylistHead,
        Loading
    },
    setup (props) {
        const route = useRoute()
        const playlistInfo = ref({})
        const showLoading = ref(true)
        onMounted(() => {
            getPlaylistInfo(route.params.id).then(({ playlist }) => {
                playlistInfo.value = playlist
                setTimeout(() => {
                    showLoading.value = false
                }, 300)
            })
        })
        return {
            playlistInfo,
            showLoading
        }
    }
}
</script>

<style>

</style>
