<template>
    <div class="song_item" v-if="props.song">
        <div class="song-pic">
            <img :src="props.song.al.picUrl" alt />
        </div>
        <div class="song-info">
            <h3>{{props.song.name}}</h3>
            <p>{{props.song.al.name}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        song: {
            type: Object
        }
    },
    setup (props) {
        return {
            props
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.song_item {
    padding: rem(10) 0;
    display: flex;
    align-items: center;
    flex: 1;
    height: rem(65);
    .song-pic {
        width: 17%;
        img {
            border-radius: 2px;
            width: rem(50)
        }
    }
    .song-info {
        width: 83%;
        flex: 1;
        margin-left: rem(8);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        h3{
            font-size: rem(14);;
            @include textOverflow();
        }
        p {
            font-size: rem(12);
            padding: rem(5) 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #ddd;
            @include textOverflow()
        }
    }
}
</style>
