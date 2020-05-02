<template>
    <div class="result_song" v-show="searchResult.data">
        <ul>
            <li v-for="(song,index) in searchResult.data" :key="song.id">
                <span class="index">{{index + 1}}</span>
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
            console.log(searchState.searchResult)
            setSongList(searchState.searchResult.song.data)
        }
        return {
            searchResult,
            handleClickSong
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
li{
                display: flex;
            align-items: center;
            span.index{
                font-size: rem(14);
                color: #ddd;
                padding-right: rem(12);
            }
}
</style>
