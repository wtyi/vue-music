<template>
    <div class="result-menu">
        <ul>
            <span class="active" :style="activeSpanClass"></span>
            <li data-index=1 @click="handleSwitch">综合</li>
            <li data-index=2 @click="handleSwitch">歌曲</li>
            <li data-index=3 @click="handleSwitch">视频</li>
            <li data-index=4 @click="handleSwitch">歌单</li>
            <li data-index=5 @click="handleSwitch">专辑</li>
            <li data-index=6 @click="handleSwitch">歌手</li>
            <li data-index=7 @click="handleSwitch">用户</li>
        </ul>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
    setup (props, ctx) {
        const defaultIndex = ref(0)
        const activeSpanClass = computed(() => {
            return {
                left: defaultIndex.value * 18 + 9 + '%'
            }
        })
        const handleSwitch = function (e) {
            defaultIndex.value = e.target.dataset.index - 1
        }
        return {
            activeSpanClass,
            handleSwitch
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.result-menu {
    width: 100%;
    ul {
        width: 100%;
        white-space: nowrap;
        overflow-y: auto;
        @include scroll(transparent, transparent, 0, transparent);
        position: relative;
        padding-bottom: rem(10);
        span.active{
            position: absolute;
            left: 45%;
            bottom: 0;
            width: rem(24);
            height: 3px;
            background-color: #ddd;
            border-radius: 5px;
            transform: translateX(- rem(12));
            transition: left .3s ease-out;
        }
    }
    li {
        display: inline-block;
        width: 18%;
        text-align: center;
        padding: rem(5);
        color: #ddd;
    }
}
</style>
