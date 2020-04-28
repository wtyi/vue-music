<template>
    <div v-show="searchResult">
        <div class="songs" v-if="searchResult.song">
            <h2>单曲</h2>
            <ul>
                <li v-for="song in searchResult.song.songs" :key="song.id">
                    <SongItem :song="song" />
                </li>
            </ul>
            <p class="more">{{searchResult.song.moreText}} ></p>
        </div>
        <div class="singers" v-if="searchResult.artist">
            <h2>歌手</h2>
            <ul>
                <li v-for="singer in searchResult.artist.artists" :key="singer.id">
                    <SingerItem :singer="singer" />
                </li>
            </ul>
            <p class="more">{{searchResult.artist.moreText}} ></p>
        </div>
        <div class="albums" v-if="searchResult.album">
            <h2>专辑</h2>
            <ul>
                <li v-for="album in searchResult.album.albums" :key="album.id">
                    <AlbumItem :album="album" />
                </li>
            </ul>
            <p class="more">{{searchResult.album.moreText}} ></p>
        </div>
         <div class="songList" v-if="searchResult.playList">
            <h2>歌单</h2>
            <ul>
                <li v-for="playList in searchResult.playList.playLists" :key="playList.id">
                    <SongListItem :playList="playList" />
                </li>
            </ul>
            <p class="more">{{searchResult.playList.moreText}} ></p>
        </div>
    </div>
</template>

<script>
import SongItem from './songItem'
import SingerItem from './singerItem'
import AlbumItem from './albumItem'
import SongListItem from './songListItem'
import { computed } from 'vue'
export default {
    components: {
        SongItem,
        SingerItem,
        AlbumItem,
        SongListItem
    },
    props: {
        searchResult: Object
    },
    setup (props, ctx) {
        const searchResult = computed(() => {
            return props.searchResult
        })
        return {
            searchResult
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
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
