<template>
    <div class="album_head" v-if="Object.keys(album).length > 0">
        <div class="album-nav">
            <span class="iconfont icon-fanhui" @click="handleBack"></span>
            <h3>专辑</h3>
            <span></span>
        </div>
        <div class="album-info">
            <div class="album-pic">
                <img :src="album.picUrl" alt />
            </div>
            <div class="album-metadata">
                <h3>{{album.name}}</h3>
                <div class="singer">
                    <img :src="album.artist.picUrl" alt />
                    <span>{{album.artist.name}}</span>
                    <div class="view" @click="handleViewSinger(album.artist.id)">view</div>
                </div>
                <div class="album-desc" @click="setShowDescBox(true)">
                    <p>简介:{{album.description}}</p>
                    <span class="iconfont icon-arrow-right"></span>
                </div>
            </div>
        </div>
        <div class="album-data-count">
            <ul>
                <li>
                    <span class="iconfont icon-heart"></span>
                    <span class="count">{{formatCount(album.info.likedCount,false)}}</span>
                </li>
                <li>
                    <span class="iconfont icon-heart"></span>
                    <span class="count">{{formatCount(album.info.likedCount,false)}}</span>
                </li>
                <li>
                    <span class="iconfont icon-heart"></span>
                    <span class="count">{{formatCount(album.info.likedCount,false)}}</span>
                </li>
            </ul>
        </div>
        <div class="album-description-box" v-if="showDescriptionBox">
            <div class="desc" v-show="album.blurPicUrl" :style="{backgroundImage:`url(${album.blurPicUrl})`}">
                <div class="blur"></div>
                <div class="content">
                    <div class="album-pic">
                        <img
                            :src="album.picUrl"
                            alt
                        />
                    </div>
                    <div class="album_data">
                        <ul>
                            <li>
                                <span>专辑：{{album.name}}</span>
                            </li>
                            <!-- <li>
                                <span>语种：</span>
                                <span class="block">国语</span>
                            </li> -->
                            <li>
                                <span>发行时间：{{formatTime(album.publishTime)}}</span>
                            </li>
                            <li>
                                <span>唱片公司：</span>
                                <span class="block">{{album.company}}</span>
                            </li>
                            <li>
                                <span>类型：{{album.subType}}</span>
                            </li>
                            <!-- <li>
                                <span>流派：</span>
                                <span>POP流行</span>
                            </li> -->
                        </ul>
                    </div>
                    <p>{{album.description}}</p>
                </div>
                <div class="close" @click="setShowDescBox(false)">
                    <span class="iconfont icon-close"></span>
                </div>
            </div>
            <div class="mask"></div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import formatTime from '@/utils/formatTime'
import formatCount from '@/utils/formatCount'
import { useRouter } from 'vue-router'
export default {
    props: {
        albumData: Object
    },
    setup (props) {
        const showDescriptionBox = ref(false)
        const router = useRouter()
        const setShowDescBox = bool => (showDescriptionBox.value = !!bool)
        const album = computed(() => {
            return props.albumData.album
        })
        const handleBack = () => router.history.go(-1)
        const handleViewSinger = id => router.push({ name: 'singer', params: { id } })
        return {
            showDescriptionBox,
            setShowDescBox,
            album,
            formatTime,
            formatCount,
            handleBack,
            handleViewSinger
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.album_head {
    background-color: rgba(255, 255, 255, 0.05);
}
.album-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: rem(10);
    h3 {
        font-size: rem(15);
    }
    span {
        font-size: rem(18);
        font-weight: bold;
    }
}
.album-info {
    display: flex;
    align-items: center;
    padding: rem(20);
    .album-pic {
        width: 40%;
        height: rem(100);
        // text-align: center;
        img {
            width: rem(100);
            height: rem(100);
            border-radius: 3px;
        }
    }
    .album-metadata {
        width: 60%;
        height: rem(100);
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-around;
        h3 {
            font-size: rem(14);
        }
        .singer {
            display: flex;
            align-items: center;
            img {
                width: rem(20);
                height: rem(20);
                border-radius: 50%;
                vertical-align: middle;
            }
            span {
                padding-left: rem(10);
            }
            .view {
                padding: rem(3) rem(8);
                border-radius: 5px;
                border: 1px solid #38f;
                font-size: rem(12);
                margin-left: rem(6);
                background-color: #38d;
                color: #ddd;
            }
        }
        .album-desc {
            display: flex;
            // flex: 1;
            align-items: center;
            p {
                @include textOverflow;
                font-size: rem(12);
                color: #ddd;
            }
            span {
                font-size: rem(12);
                color: #ddd;
            }
        }
    }
}
.album-data-count {
    ul {
        display: flex;
        padding: rem(5) rem(20);
        justify-content: space-between;
        align-items: center;
        li {
            padding: rem(5);
            span:nth-child(2) {
                padding-left: rem(5);
            }
        }
    }
}
.album-description-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
    }
    .desc {
        width: 80vw;
        height: 60vh;
        position: absolute;
        top: 5vh;
        left: 10vw;
        z-index: 2;
        border-radius: 6px;
        // background-image: url(https://p2.music.126.net/klOSGBRQhevtM6c9RXrM1A==/18808245906527670.jpg);
        background-size: 100% 100%;
        animation: move 0.2s ease-in-out;
        @keyframes move {
            0% {
                opacity: 0;
                transform: scale(0.5);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    }
    .close {
        position: absolute;
        left: 50%;
        bottom: - rem(100);
        transform: translateX(-50%);
        border: 1px solid #fff;
        border-radius: 50%;
        padding: rem(10);
        width: rem(36);
        height: rem(36);
        span {
            font-size: rem(14);
        }
    }
    .blur {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        overflow: hidden;
        z-index: 1;
        backdrop-filter: blur(30px);
        background-color: rgba(255, 255, 255, 0.05);
    }
    .content {
        position: relative;
        z-index: 5;
        & > p {
            max-height: 22vh;
            overflow-y: scroll;
            padding: 0 rem(15);
            color: #ddd;
        }
        .album_data {
            max-height: 22vh;
            padding: rem(10) 0;
            overflow: hidden;
            text-align: center;
            ul {
                li {
                    padding: rem(5) 0;
                    span {
                        font-size: rem(13);
                        color: #ddd;
                        &.block {
                            color: #fff;
                        }
                    }
                }
            }
        }
        .album-pic {
            height: 15vh;
            padding: rem(10);
            text-align: center;
            img {
                width: rem(100);
                height: rem(100);
                border-radius: 1px;
            }
        }
        p {
            line-height: rem(20);
            font-size: rem(12);
        }
    }
}
</style>
