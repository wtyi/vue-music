<template>
    <div class="result_all" v-show="searchResult">
        <div class="songs" v-if="searchResult.song">
            <h2>单曲</h2>
            <ul>
                <li v-for="song in searchResult.song.songs" :key="song.id">
                    <SongItem :song="song" @song="handleClickSong" />
                </li>
            </ul>
            <p class="more" @click="handleMores(1)">{{searchResult.song.moreText}}  &nbsp;></p>
        </div>
        <div class="singers" v-if="searchResult.artist">
            <h2>歌手</h2>
            <ul>
                <li v-for="singer in searchResult.artist.artists" :key="singer.id">
                    <SingerItem :singer="singer" @singer="handleClickArtist" />
                </li>
            </ul>
            <p class="more" @click="handleMores(2)">{{searchResult.artist.moreText}} &nbsp; ></p>
        </div>
        <div class="albums" v-if="searchResult.album">
            <h2>专辑</h2>
            <ul>
                <li v-for="album in searchResult.album.albums" :key="album.id">
                    <AlbumItem :album="album" @album="handleClickAlbum" />
                </li>
            </ul>
            <p class="more" @click="handleMores(3)">{{searchResult.album.moreText}} &nbsp;></p>
        </div>
         <div class="songList" v-if="searchResult.playList">
            <h2>歌单</h2>
            <ul>
                <li v-for="playList in searchResult.playList.playLists" :key="playList.id">
                    <SongListItem :playList="playList" @playlist='handleClickPlaylist' />
                </li>
            </ul>
            <p class="more" @click="handleMores(4)">{{searchResult.playList.moreText}}  &nbsp;></p>
        </div>
    </div>
</template>

<script>
import SongItem from '@/components/result/songItem'
import SingerItem from '@/components/result/singerItem'
import AlbumItem from '@/components/result/albumItem'
import SongListItem from '@/components/result/songListItem'
import { useSearchState, useSearchMethods } from '../useSearch'
import { setPlaySong, setSongList } from '@/core/music/setter.js'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
    components: {
        SongItem,
        SingerItem,
        AlbumItem,
        SongListItem
    },
    setup (props, ctx) {
        const searchState = useSearchState()
        const searchMethods = useSearchMethods()
        const searchResult = computed(() => {
            return searchState.searchResult.all
        })
        const router = useRouter()
        const handleClickArtist = (artist) => {
            const id = artist.id
            router.push({ name: 'singer', params: { id } })
        }
        const handleClickSong = (song) => {
            setPlaySong(song)
            setSongList(searchState.searchResult.all.song.songs)
        }
        const handleClickAlbum = (album) => album && router.push({ name: 'album', params: { id: album.id } })
        const handleClickPlaylist = playlist => playlist && router.push({ name: 'playlist', params: { id: playlist.id } })

        /**
         * 具体详情页面
         */
        const handleMores = (index) => {
            searchMethods.setActiveMenuIndex(index)
            searchMethods.setSearchResultIndex(searchState.searchResultTypeList[index].index)
        }
        return {
            searchResult,
            handleClickSong,
            handleClickArtist,
            handleClickAlbum,
            handleClickPlaylist,
            handleMores
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.result_all{
    & >div{
        padding-bottom: rem(25);
    }
}
h2 {
    color: #eee;
    font-size: rem(15);
    padding: rem(5) 0;
}
ul {
    li {
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        &:last-child {
            border: none;
        }
    }
    padding: rem(15) 0;
}
p.more {
    text-align: center;
    color: #ddd;
    font-size: rem(12);
}
</style>
