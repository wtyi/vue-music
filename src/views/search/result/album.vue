<template>
    <div class="result_albums">
        <ul>
            <li v-for="album in searchResult.data" :key="album.id">
                <AlbumItem :album="album" @album="handleClickAlbum" />
            </li>
        </ul>
    </div>
</template>

<script>
import AlbumItem from '@/components/result/albumItem'
import { useSearchState, loadMoreResult } from '../useSearch'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
    components: {
        AlbumItem
    },
    setup (props, ctx) {
        const searchState = useSearchState()
        const router = useRouter()
        const searchResult = computed(() => {
            return searchState.searchResult.album
        })
        const loadMore = () => {
            loadMoreResult()
        }
        const handleClickAlbum = (album) => album && router.push({ name: 'album', params: { id: album.id } })
        return {
            searchState,
            searchResult,
            loadMore,
            handleClickAlbum
        }
    }
}
</script>

<style lang="scss">

</style>
