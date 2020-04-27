<template>
<!-- recent fashion 近期流行.. -->
  <div class="recent">
      <div class="title">
          <h1>推荐歌曲 </h1>
          <span class="more">
              <i class="iconfont icon-arrow-right"></i>
          </span>
      </div>
      <div class="recent-song-List">
          <ul>
              <li v-for="song in state.songList" :key="song.id" :style="{backgroundImage:`url(${song.picUrl})`}">
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import { getNewSong } from '@/request/api.js'
import { onMounted, reactive } from 'vue'
export default {
    setup (props, ctx) {
        const state = reactive({
            songList: []
        })
        onMounted(() => {
            getNewSong().then(({ result }) => {
                state.songList = result
            })
        })
        return {
            state
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixin.scss";
.recent{
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

.recent-song-List{
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
</style>
