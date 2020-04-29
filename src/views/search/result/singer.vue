<template>
    <div class="result_singer">
        <ul>
            <li v-for="artist in searchResult.data" :key="artist.id">
                <SingerItem :singer="artist" @singer="handleClickArtist" />
            </li>
        </ul>
    </div>
</template>

<script>
import SingerItem from '@/components/result/singerItem'
import { useSearchState } from '../useSearch'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
    components: {
        SingerItem
    },
    setup (props, ctx) {
        const searchState = useSearchState()
        const router = useRouter()
        const handleClickArtist = (artist) => {
            const id = artist.id
            router.push({ name: 'singer', params: { id } })
        }
        const searchResult = computed(() => {
            return searchState.searchResult.singer
        })
        return {
            searchResult,
            handleClickArtist
        }
    }
}
</script>

<style lang="scss">

</style>
