<template>
    <div class="search_page">
        <SearchHead :defaultKeyword='defaultSearchKeyword' @search="handleSearch" @changeSearchSuggest='handleSearchSuggest' />
        <SearchHot :hotList='searchHotList' @changeSearchKeyword="handleSearch" v-show="!showSearchSuggest" />
        <SearchSuggest v-show="showSearchSuggest" :searchSuggestList="searchSuggest" :searchKeyword='searchKeyword'  />
    </div>
</template>

<script>
import { getSearchHot, getSearchDefaultKeyword } from '@/request/api.js'
import SearchHead from './head'
import SearchHot from './hot'
import SearchSuggest from './searchSuggest'
import { onMounted, ref } from 'vue'
export default {
    components: {
        SearchHead,
        SearchHot,
        SearchSuggest
    },
    setup (props, ctx) {
        const searchHotList = ref([])
        const defaultSearchKeyword = ref('')
        const searchSuggest = ref({})
        const showSearchSuggest = ref(false)
        const searchKeyword = ref('')
        onMounted(() => {
            Promise.all([
                getSearchHot(),
                getSearchDefaultKeyword()
            ]).then(([hotResult, keyResult]) => {
                searchHotList.value = hotResult.data
                defaultSearchKeyword.value = keyResult.data.showKeyword
            })
        })
        // 搜索
        const handleSearch = function (keyword) {

        }
        // 搜索建议
        const handleSearchSuggest = function (result) {
            if (result[0].code === -100) {
                showSearchSuggest.value = false
                searchSuggest.value = {}
            } else {
                searchSuggest.value = result[0]
                showSearchSuggest.value = true
            }
            searchKeyword.value = result[1]
        }
        return {
            searchHotList,
            defaultSearchKeyword,
            handleSearch,
            handleSearchSuggest,
            showSearchSuggest,
            searchSuggest,
            searchKeyword
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
