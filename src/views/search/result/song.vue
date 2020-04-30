<template>
    <div class="result_song" v-show="searchResult.data">
        <ul>
            <li v-for="song in searchResult.data" :key="song.id">
                <SongItem :song="song" @song="handleClickSong"/>
            </li>
        </ul>
    </div>
</template>

<script>
import SongItem from '@/components/result/songItem'
import { useSearchState } from '../useSearch'
import { setPlaySong, setSongList } from '@/core/music/setter.js'
import { computed } from 'vue'
export default {
    components: {
        SongItem
    },
    setup (props, ctx) {
        const searchState = useSearchState()
        const searchResult = computed(() => {
            return searchState.searchResult.song
        })
        const handleClickSong = (song) => {
            setPlaySong(song)
            setSongList(searchState.searchResult.song.songs)
        }
        return {
            searchResult,
            handleClickSong
        }
    }
}
</script>

<style lang="scss">

</style>
