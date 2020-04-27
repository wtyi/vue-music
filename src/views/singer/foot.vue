<template>
  <div class="music">
      <div class="content" v-if="props.songList && props.songList.length > 0">
          <ul class="song-list">
              <li v-for="song in props.songList" :key="song.id" @click="playSong(song)">
                  <songItem :song="song" />
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import songItem from '@/components/songItem/index.vue'
export default {
    components: {
        songItem
    },
    props: {
        songList: {
            type: Array
        }
    },
    setup (props, { emit }) {
        const playSong = function (song) {
            emit('onPlay', song)
        }

        return {
            props,
            playSong
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.music{
    height: calc(53vh);
    background-color:rgb(56, 24, 163);
    overflow: hidden;
}

.content{
    // margin-top: 30px;
    background-color: #fff;
    height: 100%;
    border-top-left-radius: rem(130);
    padding: rem(39) rem(20) rem(20) rem(25);
    overflow-y: scroll;
    border-top:rem(18) solid  rgba(77, 49, 158, 1.000);
}

</style>
