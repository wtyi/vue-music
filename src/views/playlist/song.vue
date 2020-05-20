<template>
    <div class="album-song">
        <ul>
            <li v-for="(song,index) in songs" :key="song.id">
                <span class="index">{{index + 1}}</span>
                <SongItem :song="song" :showPic="false" @song="handleClickSong" />
            </li>
            <p class="loadMore" v-load="loadMore">正在加载中...</p>
        </ul>
    </div>
</template>

<script>
import SongItem from '@/components/result/songItem'
import { setSongList, setPlaySong } from '@/core/music/setter'
import { computed, ref } from 'vue'
export default {
    components: {
        SongItem
    },
    props: {
        playlistInfo: Object
    },
    setup (props) {
        const limit = ref(20) // 渲染数量
        const songs = computed(() => {
            return props.playlistInfo.tracks && props.playlistInfo.tracks.slice(0, limit.value)
        })
        const handleClickSong = song => {
            setPlaySong(song)
            props.playlistInfo.tracks.length > 1 &&
                setSongList(props.playlistInfo.tracks)
        }
        const loadMore = function () {
            if (props.playlistInfo.tracks) {
                limit.value += limit.value
            }
        }
        return {
            songs,
            handleClickSong,
            loadMore
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.album-song {
    padding: rem(20);
}
ul {
    li {
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        display: flex;
        align-items: center;
        span.index {
            font-size: rem(14);
            color: #ddd;
            padding-right: rem(12);
        }
        &:last-child {
            border: none;
        }
    }
}
.loadMore {
    color: transparent;
}
</style>
