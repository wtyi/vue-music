import { reactive } from 'vue'
const initialData = {
    searchKeyword: '', // 搜索内容
    defaultSearchKeyword: '搜索点什么吧', // 系统推荐搜索内容
    searchHotList: [], // 搜索推荐列表
    searchSuggest: { artists: [], albums: [], songs: [] }, // 搜索联想数据
    showSearchSuggest: false, // 是否显示搜索联想页面
    searchResult: { code: -100 } // 搜索结果
}
const searchState = reactive({ ...initialData })

export const useSearchState = function () {
    return searchState
}
const setSearchKeyword = keyword => (searchState.searchKeyword = keyword)
const setSearchHotList = hotList => (searchState.searchHotList = hotList)
const setDefaultSearchKeyword = keyword => (searchState.defaultSearchKeyword = keyword)
const setSearchSuggest = suggestData => (searchState.searchSuggest = suggestData)
const setShowSearchSuggest = bool => (searchState.showSearchSuggest = bool)
const setSearchResult = result => (searchState.searchResult = result)
const resetData = () => {
    for (const prop in searchState) {
        searchState[prop] = initialData[prop]
    }
}

export const useSearchMethods = function () {
    return {
        setSearchKeyword,
        setSearchHotList,
        setDefaultSearchKeyword,
        setSearchSuggest,
        setShowSearchSuggest,
        setSearchResult,
        resetData
    }
}
