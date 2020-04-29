<template>
    <div class="result_songlist">
        <ul>
            <li v-for="playlist in searchResult.data" :key="playlist.id">
                <songlistItem :playList="playlist" />
            </li>
        </ul>
    </div>
</template>

<script>
import songlistItem from '@/components/result/songListItem'
import { useSearchState } from '../useSearch'
import { computed } from 'vue'
export default {
    components: {
        songlistItem
    },
    setup (props, ctx) {
        const searchState = useSearchState()
        const searchResult = computed(() => {
            return searchState.searchResult.playlist
        })
        return {
            searchResult
        }
    }
}
</script>

<style lang="scss">

</style>
