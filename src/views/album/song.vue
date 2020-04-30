<template>
  <div class="album-song">
      <ul>
          <li v-for="song in songs" :key="song.id">
              <SongItem :song="song" @song="handleClickSong" />
          </li>
      </ul>
  </div>
</template>

<script>
import SongItem from '@/components/result/songItem'
import { setSongList, setPlaySong } from '@/core/music/setter'
import { computed } from 'vue'
export default {
    components: {
        SongItem
    },
    props: {
        albumData: Object
    },
    setup (props) {
        const songs = computed(() => {
            return props.albumData.songs
        })
        const handleClickSong = (song) => {
            setPlaySong(song)
            props.albumData.songs.length > 1 && setSongList(props.albumData.songs)
        }
        return {
            songs,
            handleClickSong
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.album-song{
    padding: rem(20);
}
ul{
        li{
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            &:last-child {
                border: none;
            }
        }
    }
</style>
