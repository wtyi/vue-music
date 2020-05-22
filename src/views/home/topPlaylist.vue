<template>
  <div class="top_play_list">
      <div class="title">
          <h1>精品歌单 </h1>
          <span class="more">
              <i class="iconfont icon-arrow-right"></i>
          </span>
      </div>
      <div class="playlist-List">
          <ul>
              <li v-for="song in state.playlist" :key="song.id" :style="{backgroundImage:`url(${song.coverImgUrl}?quality=15)`}" @click="handleClickPlaylist(song)">
              </li>
              <span class="loadMore" v-load="loadMore">loading...</span>
          </ul>
      </div>
  </div>
</template>

<script>
import { getIndexPlaylist } from '@/request/api.js'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup (props, ctx) {
        const state = reactive({
            playlist: []
        })
        const router = useRouter()
        onMounted(() => {
            getIndexPlaylist().then(({ playlists }) => {
                state.playlist = playlists
            })
        })
        const handleClickPlaylist = (playlist) => playlist && router.push({ name: 'playlist', params: { id: playlist.id } })
        const loadMore = () => state.playlist && state.playlist.length > 0 && (console.log('加载'))
        return {
            state,
            handleClickPlaylist,
            loadMore
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixin.scss";
.top_play_list{
    margin-top: rem(50);
    .title{
        padding: rem(15) 0;
        display: flex;
        justify-content: space-between;
        h1{
            font-size: rem(20);
            color: #fefefe;
        }
        span.more{
            i{
                font-size: 18px;
                font-weight: 500;
                color: #fefefe;
            }
        }
    }
}

.playlist-List{
    ul{
        overflow-x: scroll;
        overflow-y: hidden;
        width: 100%;
        height: rem(85);
        padding-bottom: 3px;
        white-space: nowrap;
        @include scroll(transparent,transparent,0px,rgba(0,0,0,0));
        li{
            position: relative;
            display: inline-block;
            background-size: 100% 100%;
            border-radius: 6px;
            width: 30%;
            margin: 0 rem(6);
            height: 100%;
            &:first-child{
                margin-left: 0;
            }
            &:last-child{
                margin-right: 0;
            }
        }
    }
}
.loadMore{
    color: transparent;
}
</style>
