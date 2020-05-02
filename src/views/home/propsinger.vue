<template>
<!-- 推荐歌手... -->
  <div class="propSinger">
      <div class="title">
          <h1>热门歌手</h1>
          <span>Daily updateg</span>
      </div>
    <div class="singer-list">
        <ul>
            <li class="singer-item" v-for="singer in state.singers" :key="singer.id">
                <div class="singer-info" @click="singSingerSong(singer)">
                    <div class="singer-avatar">
                        <img :src="singer.picUrl" :alt="singer.name">
                    </div>
                    <div class="singer">
                        <p class="singer-name">{{singer.name}}</p>
                        <p class="follow-count">+10k followers</p>
                    </div>
                </div>
                <div class="music-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="follow">
                    <div class="follow-btn" @click="singSingerSong(singer)">
                        <i class="iconfont icon-add"></i>
                        <span>Follow</span>
                    </div>
                </div>
            </li>
        </ul>
        <p class="loadMore" v-load="loadMore"></p>
    </div>
  </div>
</template>

<script>
import { getTopSinger } from '@/request/api.js'
import { onMounted, reactive, watch } from 'vue'
import Modal from '@/components/modal/index.js'
import { useRouter } from 'vue-router'
export default {
    components: {

    },
    setup (props, ctx) {
        const state = reactive({
            singers: []
        })
        const rules = reactive({
            offset: 0,
            limit: 20
        })
        // 获取router实例
        const router = useRouter()
        const singSingerSong = function (singer) {
            if (singer.id) {
                // 跳转
                router.push({ name: 'singer', params: { id: singer.id } })
            } else {
                // 提示
                Modal.show('ID不存在')
            }
        }

        onMounted(() => {
            getTopSinger(rules).then(({ artists: singers }) => {
                state.singers = state.singers.concat(singers)
            })
        })

        /**
         * 加载更多
         */
        watch(() => rules.offset, () => {
            getTopSinger(rules).then(({ artists: singers }) => {
                state.singers = state.singers.concat(singers)
            })
        })
        const loadMore = () => {
            rules.offset += rules.limit
        }
        return {
            state,
            singSingerSong,
            loadMore
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.propSinger{
    .title{
        padding:rem(10) 0;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        h1{
            font-size: rem(20);
            color: #fefefe;
        }

        span{
            font-size: 12px;
            color: #999;
            padding: rem(10);
            transform: scale(.8);
        }
    }
}

$leftColor:rgba(115, 36, 245, 1.000);
$rightColor:rgba(54, 114, 241, 1.000);

.singer-item{
    display: flex;
    flex:1;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(50, 56, 85);
    padding: rem(15) 0;
    .singer-info{
        width: 45%;
        height: rem(38);
        display: flex;
        align-items: center;
        .singer-avatar{
            img{
                display: inline-block;
                line-height: rem(38);
                width: rem(35);
                height: rem(35);
                border-radius: 50%;
            }
        }
        .singer{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: rem(5);
            .singer-name{
                font-size: 12px;
                // font-weight: 500;
            }
            .follow-count{
                 background: linear-gradient(to right, $leftColor, $rightColor);
                -webkit-background-clip: text;
                color: transparent;
                font-weight: 500;
            }
        }
    }
}

.music-animation{
    height: rem(30);
    span{
        display: inline-block;
        width: rem(4);
        height: 100%;
        background:linear-gradient(to top,$leftColor,$rightColor);
        border-radius: 4px;
        margin: 0 2px;
        vertical-align: bottom;
        &:nth-child(1){
            height:45%;
            //  animation: moveUpDown .3s infinite;
        }
        &:nth-child(2){
            height: 80%;
        }

        &:nth-child(3){
            height: 50%;
        }
        &:nth-child(4){
            height: 90%;
        }
    }
}

.follow{
    height: rem(38);
    line-height: rem(38);
    .follow-btn{
        width: 100%;
        margin-top: rem(8);
        line-height: rem(22);
        border-radius: 5px;
        background:linear-gradient(to right,$leftColor,$rightColor);
        padding: 3px 7px 3px 5px;
        transform: scale(.8);
         font-weight: 600;
        i{
            font-size: 12px;
            padding-right: 3px;
        }
        span{
            font-size: rem(13);
            font-size: 12px;
             font-weight: bold;
        }
    }
}

.loadMore{
    color: transparent;
    text-align: center;
    font-size: 12px;
}
</style>
