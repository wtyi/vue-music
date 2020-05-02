<template>
    <div class="result_songlist">
        <ul>
            <li v-for="playlist in searchResult.data" :key="playlist.id">
                <songlistItem :playList="playlist" @playlist='handleClickPlaylist' />
            </li>
        </ul>
    </div>
</template>

<script>
import songlistItem from '@/components/result/songListItem'
import { useSearchState } from '../useSearch'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
    components: {
        songlistItem
    },
    setup (props, ctx) {
        const searchState = useSearchState()
        const router = useRouter()
        const searchResult = computed(() => {
            return searchState.searchResult.playlist
        })
        const handleClickPlaylist = playlist => playlist && router.push({ name: 'playlist', params: { id: playlist.id } })
        return {
            searchResult,
            handleClickPlaylist
        }
    }
}
</script>

<style lang="scss">

</style>
