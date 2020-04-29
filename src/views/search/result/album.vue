<template>
    <div class="result_albums">
        <ul>
            <li v-for="album in searchResult.data" :key="album.id">
                <AlbumItem :album="album" />
            </li>
        </ul>
    </div>
</template>

<script>
import AlbumItem from '@/components/result/albumItem'
import { useSearchState, loadMoreResult } from '../useSearch'
import { computed } from 'vue'
export default {
    components: {
        AlbumItem
    },
    setup (props, ctx) {
        const searchState = useSearchState()
        const searchResult = computed(() => {
            return searchState.searchResult.album
        })
        const loadMore = () => {
            loadMoreResult()
        }
        return {
            searchState,
            searchResult,
            loadMore
        }
    }
}
</script>

<style lang="scss">

</style>
