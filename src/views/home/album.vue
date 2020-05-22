<template>
    <div class="index_album">
        <h1>最新专辑</h1>
        <div class="album-list">
            <ul v-hammer:swipe.down="albumMoveDown">
                <li class="album-item" v-for="(album) in state.albums"
                    :key="album.id"
                    :style="{backgroundImage:`url(${album.blurPicUrl}?quality=10&param=1400y800)`}"
                    :class="album.class"
                    @click="viewAlbum(album.id)"
                >
                    <div class="head">
                        <span>NEW</span>
                    </div>
                    <div class="foot">
                        <div class="left" :style="{fontSize:'20px'}">
                            <p class="title">Try Me</p>
                            <p class="time">5 Mar 2020</p>
                        </div>
                        <div class="right" >
                            <span class="heart">
                                <!-- 爱心 -->
                                <i class="iconfont icon-heart"></i>
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getIndexNewAlbum } from '../../request/api'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import albumMove from './album.js'
export default {
    setup (props, ctx) {
        const state = reactive({
            albums: [],
            showLoadding: false
        })
        const router = useRouter()
        const albumMoveDown = function (e) {
            albumMove(state, 500, function () {

            })
        }
        const viewAlbum = function (id) {
            router.push({ name: 'album', params: { id } })
        }

        onMounted(() => {
            getIndexNewAlbum().then(({ albums }) => {
                state.albums = albums.splice(0, 5).sort().map((item, index) => ({ ...item, index, class: `item${index + 1}` }))
            })
        })

        return {
            state,
            albumMoveDown,
            viewAlbum
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';
h1 {
    font-size: .4rem;
    font-weight: 600;
    color: #fefefe;
    padding-bottom: 10px;
}
.album-list{
    // padding: 10px;
    position: relative;
}
ul{
    height: rem(200);
}
.album-item{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    border-radius: 10px;
    width: 100%;
    height: rem(200);
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .head{
        padding: rem(20) rem(10);
        span{
            background-color:rgba(0,0,0,.3);
            color: #fefefe;
            font-size: rem(12);
            padding: rem(3) rem(5);
            border-radius: 6px;
        }
    }
    .foot{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: rem(5) rem(10);
        p{
            padding: rem(3) 0;
            font-size: 12px
        }
        .heart{
            background-color:rgba(0,0,0,.3);
            color: #fefefe;
            width: rem(22);
            height: rem(22);
            padding: rem(5);
            border-radius: 6px;
            i{
                font-size: 12px;
            }
        }
    }
}
.album-item{
    &.item1{
        top: rem(40);
        z-index: 10;

    }
    &.item2{
        top: rem(32);
        z-index: 9;
        width: 95%;
    }
    &.item3{
        top:rem(24);
        z-index: 8;
        width: 90%;
    }
    &.item4{
        top: rem(16);
        z-index: 7;
        width: 85%;
    }
    &.item5{
        top: rem(16);
        z-index: 6;
        width: 80%;
    }

    &.hidden{
        width: 100%!important;
        top: rem(40);
        transform: translateX(-50%) translateY(rem(100));
        opacity: 0;
        transition: transform .5s,opacity .5s;
        z-index: 20;
    }

    &.move{
        // transform: translateX(-50%) translateY(8px);
        transition: top .5s;
    }
}
</style>
