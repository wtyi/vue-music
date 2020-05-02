<template>
    <div class="album_head" v-if="playlistInfo">
        <div class="album-nav">
            <span class="iconfont icon-fanhui" @click="handleBack"></span>
            <h3>歌单</h3>
            <span></span>
        </div>
        <div class="album-info" v-show="playlistInfo.creator">
            <div class="album-pic">
                <img :src="playlistInfo.coverImgUrl" alt />
            </div>
            <div class="album-metadata">
                <h3>{{playlistInfo.name}}</h3>
                <div class="singer">
                    <img :src="playlistInfo.creator.avatarUrl" alt />
                    <span>{{playlistInfo.creator.nickname}}</span>
                </div>
                <div class="tags">
                    <span v-for="tag in playlistInfo.tags" :key="tag">{{tag}}</span>
                </div>
                <div class="album-desc" @click="setShowDescBox(true)">
                    <p>简介:{{playlistInfo.description}}</p>
                    <span class="iconfont icon-arrow-right"></span>
                </div>
            </div>
        </div>
        <div class="album-data-count" v-show="playlistInfo.playCount">
            <ul>
                <li>
                    <span class="iconfont icon-play"></span>
                    <span class="count">{{formatCount(playlistInfo.playCount,false)}}</span>
                </li>
                <li>
                    <span class="iconfont icon-sub"></span>
                    <span class="count">{{formatCount(playlistInfo.subscribedCount,false)}}</span>
                </li>
                <li>
                    <span class="iconfont icon-shard"></span>
                    <span class="count">{{formatCount(playlistInfo.shareCount,false)}}</span>
                </li>
                <li>
                    <span class="iconfont icon-comment"></span>
                    <span class="count">{{formatCount(playlistInfo.commentCount,false)}}</span>
                </li>
            </ul>
        </div>
        <div class="album-description-box" v-if="showDescriptionBox">
            <div class="desc" v-show="playlistInfo.coverImgUrl" :style="{backgroundImage:`url(${playlistInfo.coverImgUrl})`}">
                <div class="blur"></div>
                <div class="content">
                    <div class="album-pic">
                        <img
                            :src="playlistInfo.coverImgUrl"
                            alt
                        />
                    </div>
                    <p>{{playlistInfo.description}}</p>
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
        playlistInfo: Object
    },
    setup (props) {
        const showDescriptionBox = ref(false)
        const router = useRouter()
        const setShowDescBox = bool => (showDescriptionBox.value = !!bool)
        const handleBack = () => router.history.go(-1)
        const handleViewSinger = id => router.push({ name: 'singer', params: { id } })
        const playlistInfo = computed(() => {
            console.log(props)
            const {
                playCount,
                subscribedCount,
                shareCount,
                commentCount,
                tags,
                coverImgUrl,
                createTime,
                creator,
                description,
                name
            } = props.playlistInfo
            return {
                playCount,
                subscribedCount,
                shareCount,
                commentCount,
                tags,
                coverImgUrl,
                createTime,
                creator,
                description,
                name
            }
        })
        return {
            showDescriptionBox,
            setShowDescBox,
            playlistInfo,
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
            @include textOverflow;
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
                color: #fff;
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
            display: flex;
            align-items: center;
            span:nth-child(2) {
                padding-left: rem(5);
                 color:#ddd;
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
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
    }
    .content {
        position: relative;
        z-index: 5;
         border-radius: 6px;
        & > p {
            max-height: 42vh;
            overflow-y: scroll;
            padding: 0 rem(15);
            color: #ddd;
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

.tags{
    display: flex;
    align-items: center;
    span{
        font-size: rem(12);
        padding: rem(3) rem(5);
        border: 1px solid #38d;
        border-radius: 6px;
        transform: scale(.8);
        color: #fff;
        background-color: #38f;
    }
}
</style>
