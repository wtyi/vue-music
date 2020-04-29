<template>
    <div class="result-menu">
        <ul>
            <span class="active" :style="activeSpanClass"></span>
            <li v-for="(menuItem,index) in searchState.searchResultTypeList" :key="menuItem.index" :data-index="index" @click="handleSwitch($event,menuItem.index)">{{menuItem.title}}</li>
        </ul>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useSearchState, useSearchMethods } from '../useSearch'
export default {
    props: {
        menu: Array
    },
    setup (props, { emit }) {
        const searchState = useSearchState()
        const searchMethods = useSearchMethods()
        const activeSpanClass = computed(() => {
            return {
                left: searchState.activeMenuIndex * 18 + 9 + '%'
            }
        })
        const handleSwitch = (e, index) => {
            searchMethods.setActiveMenuIndex(e.target.dataset.index)
            searchMethods.setSearchResultIndex(index)
        }
        return {
            activeSpanClass,
            handleSwitch,
            searchState
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
