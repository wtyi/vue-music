<template>
    <div class="song-item">
        <div class="song-avatar">
            <img :src="song.al.picUrl" alt />
        </div>
        <div class="song-info">
            <div class="song-name">
                <span>{{song.name}}</span>
            </div>
            <div class="song-singers">
                <p>{{computedSingers(song.ar)}} . {{song.al.name}}</p>
            </div>
        </div>
        <div class="song-time">
            <span>{{formatDt(song.dt)}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        song: Object
    },
    setup (props) {
        const computedSingers = function (ar) {
            if (ar && ar.length === 1) {
                return ar[0].alia ? ar[0].alia[0] : ar[0].name
            } else if (ar && ar.length > 1) {
                let str = ''
                const names = ar.map(a => {
                    if (a.alia && a.alia[0]) {
                        return a.alia[0]
                    } else {
                        return a.name
                    }
                })
                str = names.join('/')
                return str
            }
        }
        const formatDt = function (time) {
            const s = Math.floor(time / 1000)
            const m = Math.round(s / 60 * 10) / 10
            const arr = m.toString().split('.')
            const left = parseInt(arr[0])
            const right = parseInt(arr[1])
            if (right) {
                const as = right * 60 / 10
                if (as > 9) {
                    return `${left}:${as}`
                } else {
                    return `${left}:0${as}`
                }
            } else {
                return `${parseInt(left)}:00`
            }
        }
        return {
            computedSingers,
            formatDt,
            song: props.song
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.song-item{
    color: #333;
    display: flex;
    align-items: center;
    padding: rem(10) rem(2);
    border-bottom: 1px solid rgba(238,238,238,.5);
}
    .song-avatar{
        img{
            width: rem(45);
            height: rem(45);
            border-radius: 50%;
        }
    }
    .song-info{
        flex: 1;
        padding: 0 rem(15);
        .song-name{
            font-weight: 500;
            color: black;
            font-size: rem(14);
            padding: rem(5) 0;
            max-width: rem(200);
            span{
                color: #222;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                display: -webkit-box;
            }
        }
        .song-singers{
            p{
                display: inline-block;
                font-size: rem(12);
                color: #999;
                transform: scale(.8);
                position: relative;
                top: 0;
                left: rem(-20);
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                display: -webkit-box;
            }
        }
    }
    .song-time{
        span{
            font-size: rem(13);
            color: #222;
            font-weight: 600;
        }
    }
</style>
