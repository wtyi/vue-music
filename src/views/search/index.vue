<template>
    <div class="search_page">
        <SearchHead  @search="handleSearch" @changeSearchSuggest='handleSearchSuggest' />
        <SearchHot @search="handleSearch" v-show="!searchState.showSearchSuggest"  />
        <SearchSuggest v-show="searchState.showSearchSuggest && searchState.searchResult.code === -100" />
        <SearchResult v-show="searchState.searchResult.code != -100" />
    </div>
</template>

<script>
import { getSearchHot, getSearchDefaultKeyword, getSearchResultSong, getSearchSuggest } from '@/request/api.js'
import SearchHead from './head'
import SearchHot from './hot'
import SearchSuggest from './searchSuggest'
import SearchResult from './result'
import { onMounted, onUnmounted } from 'vue'
import { useSearchState, useSearchMethods } from './useSearch'
export default {
    components: {
        SearchHead,
        SearchHot,
        SearchSuggest,
        SearchResult
    },
    setup (props, ctx) {
        const searchState = useSearchState()
        const searchMethods = useSearchMethods()
        onMounted(() => {
            Promise.all([
                getSearchHot(),
                getSearchDefaultKeyword()
            ]).then(([hotResult, keyResult]) => {
                searchMethods.setSearchHotList(hotResult.data)
                searchMethods.setDefaultSearchKeyword(keyResult.data.showKeyword)
            })
        })

        onUnmounted(() => {
            // 清除全局数据
            searchMethods.resetData()
        })
        // 搜索
        const handleSearch = function (keyword) {
            getSearchResultSong(keyword || searchState.searchKeyword, 1018).then((res) => {
                searchMethods.setSearchResult({ ...res.result, code: 200 })
            })
        }
        const handleSearchSuggest = function () {
            if (!searchState.searchKeyword || searchState.searchKeyword.length <= 0) {
                searchMethods.setShowSearchSuggest(false)
                return false
            }
            getSearchSuggest(searchState.searchKeyword).then(res => {
                searchMethods.setSearchSuggest(res.result)
                searchMethods.setShowSearchSuggest(true)
                searchMethods.setSearchResult({ ...searchState.searchResult, code: -100 })// 每次输入的时候隐藏结果页面
            })
        }
        return {
            handleSearch,
            handleSearchSuggest,
            searchState
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.search_page {
    background: linear-gradient(
        to right,
        rgba(27, 36, 59, 1),
        rgba(23, 23, 37, 1)
    );
    padding: 0 20px 100px 20px;
}

</style>
