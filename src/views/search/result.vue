<template>
    <div class="search_result">
        <ResultMenu />
        <div class="result">
            <div class="all">
                <ResultAll :searchResult="searchState.searchResult" />
            </div>
        </div>
    </div>
</template>

<script>
import ResultMenu from '@/components/result/menu'
import ResultAll from '@/components/result/all'
import ResultSong from '@/components/result/song'
import { useSearchState } from './useSearch'
export default {
    components: {
        ResultMenu,
        ResultAll,
        ResultSong
    },
    setup (props) {
        const searchState = useSearchState()
        return {
            searchState
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.result{
    position: relative;
    padding-top: rem(20);
}
.result > div{
    width: 100%;
}
</style>
