<template>
    <div class="search_result">
        <ResultMenu />
        <div class="result">
            <div
                class="all"
                v-show="searchState.searchResultIndex == 1018 && !searchState.isLoading"
            >
                <ResultAll />
            </div>
            <div class="song" v-show="searchState.searchResultIndex == 1 && !searchState.isLoading">
                <ResultSong />
            </div>
            <div
                class="album"
                v-show="searchState.searchResultIndex == 10 && !searchState.isLoading"
            >
                <ResultAlbum />
            </div>
            <div
                class="album"
                v-show="searchState.searchResultIndex == 100 && !searchState.isLoading"
            >
                <ResultSinger />
            </div>
            <div
                class="playList"
                v-show="searchState.searchResultIndex == 1000 && !searchState.isLoading"
            >
                <ResultSongList />
            </div>
            <div class="loadingMore" v-show="!searchState.isLoading" v-load="loadMore">
                <p>加载中...</p>
            </div>
        </div>
    </div>
</template>

<script>
import ResultMenu from './menu'
import ResultAll from './all'
import ResultSong from './song'
import ResultAlbum from './album'
import ResultSinger from './singer'
import ResultSongList from './songlist'
import { useSearchState, useSearchMethods, loadMoreResult } from '../useSearch'
import { getSearchResultSong } from '@/request/api.js'
import { watch } from 'vue'
export default {
    components: {
        ResultMenu,
        ResultAll,
        ResultSong,
        ResultAlbum,
        ResultSinger,
        ResultSongList
    },
    setup (props) {
        const searchState = useSearchState()
        const searchMethods = useSearchMethods()
        watch(
            () => searchState.searchResultIndex,
            val => {
                // 每次更改索引数据offset 清零
                searchMethods.setResultOffset(0)
                /**
                 * 当清除后 会隐藏该页面并触发watch 拒绝
                 */
                if (!searchState.showSearchResult) {
                    return false
                }
                searchMethods.setIsLoading(true)
                getSearchResultSong(searchState.searchKeyword, val)
                    .then(({ result }) => {
                        searchMethods.setSearchResult(result)
                        setTimeout(() => {
                            searchMethods.setIsLoading(false)
                        }, 600)
                    })
                    .catch(() => {
                        searchMethods.setIsLoading(false)
                    })
            }
        )
        const loadMore = () => {
            searchState.searchResultIndex !==
                searchState.searchResultTypeList[0].index && loadMoreResult()
        }
        return {
            searchState,
            loadMore
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.result {
    position: relative;
    padding-top: rem(20);
}
.result > div {
    width: 100%;
}
.loadingMore {
    p {
        margin-top: rem(20);
        text-align: center;
        // color: #ddd;
        color: transparent;
        font-size: rem(12);
    }
}
</style>

<style lang="scss">
.result ul {
    li {
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        &:last-child {
            border: none;
        }
    }
}
</style>
