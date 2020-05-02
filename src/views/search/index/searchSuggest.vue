<template>
    <div class="search_suggest">
        <p class="noResult" v-show="suggestList.code == -100" @click="handleSearchKeyword">去搜索"{{searchState.searchKeyword}}"</p>
        <ul v-show="suggestList.code == 200">
            <div class="showIcon">
                <div>
                    <span class="iconfont icon-singer"></span>
                    <span>歌手</span>
                </div>
                <div>
                    <span class="iconfont icon-album"></span>
                    <span>专辑</span>
                </div>
                <div>
                    <span class="iconfont icon-music"></span>
                    <span>歌曲</span>
                </div>
            </div>
            <template v-if="suggestList.artists.length > 0">
                <li class="suggest-item" v-for="singer in suggestList.artists" :key="singer.id" @click="handleClickSinger(singer)">
                    <span class="iconfont icon-singer icon"></span>
                    <div class="desc">
                        <span class="block">{{singer.first}}</span>
                        <span>{{singer.last}}</span>
                        <!-- <span>梦想的声音</span> -->
                    </div>
                </li>
            </template>
            <template v-if="suggestList.albums.length > 0">
                <li class="suggest-item" v-for="album in suggestList.albums" :key="album.id" @click="handleClickAlbum(album)">
                    <span class="iconfont icon-album"></span>
                    <div class="desc">
                        <span class="block">{{album.first}}</span>
                        <span>{{album.last}}</span>
                        <span>-</span>
                        <span>{{album.artist.name}}</span>
                    </div>
                </li>
            </template>
            <template v-if="suggestList.songs.length > 0">
                <li class="suggest-item" v-for="song in suggestList.songs" :key="song.id" @click="handleClickSong(song)">
                    <span class="iconfont icon-music"></span>
                    <div class="desc">
                        <span class="block">{{song.first}}</span>
                        <span>{{song.last}}</span>
                        <span>-</span>
                        <span>{{song.artists && song.artists[0].name}}</span>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useSearchState } from '../useSearch'
import { useRouter } from 'vue-router'
import { setPlaySong } from '@/core/music/setter.js'
export default {
    setup (props, { emit }) {
        const searchState = useSearchState()
        const router = useRouter()
        // 林俊杰  林
        const filterMatchKeyword = function (str, matchStr) {
            const index = str.indexOf(matchStr)
            if (index <= -1) {
                return ['', str]
            }
            const arr = str.split('')
            const first = arr.splice(index, matchStr.length)
            return [first.join(''), arr.join('')]
        }

        const suggestList = computed(() => {
            const artists = searchState.searchSuggest.artists || []
            const albums = searchState.searchSuggest.albums || []
            const songs = searchState.searchSuggest.songs || [];
            [...artists, ...albums, ...songs].forEach(item => {
                const [fisrt, last] = filterMatchKeyword(
                    item.name,
                    searchState.searchKeyword
                )
                item.first = fisrt
                item.last = last
            })
            let code = 200
            if (
                artists.length === 0 &&
                albums.length === 0 &&
                songs.length === 0
            ) {
                code = -100
            }
            return {
                code,
                artists,
                albums,
                songs
            }
        })
        const handleClickSinger = singer => singer && router.push({ name: 'singer', params: { id: singer.id } })
        const handleClickAlbum = album => album && router.push({ name: 'album', params: { id: album.id } })
        const handleClickSong = song => song && setPlaySong(song)
        const handleSearchKeyword = () => {
            emit('search')
        }
        return {
            searchState,
            suggestList,
            handleClickSinger,
            handleClickAlbum,
            handleClickSong,
            handleSearchKeyword
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.suggest-item {
    display: flex;
    padding: rem(11) 0;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    span.icon {
        font-size: rem(13);
    }
    span.icon.icon-singer {
        font-size: rem(14);
    }
    div.desc {
        padding: 0 rem(10);
        span {
            font-size: rem(13);
            color: #ddd;
        }
        span.block {
            color: salmon;
        }
    }
}
.noResult {
    font-size: rem(14);
    color: salmon;
    text-align: left;
}
.showIcon{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: rem(15);
    div{
        span{
            font-size: rem(12);
            &:last-child{
                padding-left: 2px;
            }
        }
    }
}
</style>
