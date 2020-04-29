<template>
    <div class="singer_item" @click="handleClick">
        <div class="singer-pic">
            <img :src="props.singer.img1v1Url" alt />
        </div>
        <div class="singer-info">
            <h3>{{props.singer.name}}</h3>
            <div class="metadata">
                <span>单曲:{{Math.floor(Math.random() * 200)}}</span>
                <span>专辑:{{props.singer.albumSize}}</span>
                <span>视频:{{props.singer.mvSize}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        singer: Object
    },
    setup (props, { emit }) {
        const handleClick = () => emit('singer', props.singer)
        return {
            props,
            handleClick
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.singer_item {
    margin-bottom: rem(6);
    padding: rem(3) 0;
    display: flex;
    align-items: center;
    flex: 1;
    height: rem(65);
    .singer-pic {
        width: 17%;
        img {
            border-radius: 50%;
            width: rem(50);
        }
    }
    .singer-info {
        width: 83%;
        flex: 1;
        margin-left: rem(8);
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        h3{
           font-size: rem(14);
           @include textOverflow()
        }
        .metadata {
            display: flex;
            align-items: center;
            span {
                font-size: rem(12);
                padding-right: rem(10);
                @include textOverflow();
                color: #ddd;
            }
        }
    }
}
</style>
