import { reactive } from 'vue'
import { getSearchResultSong } from '@/request/api'
const initialData = {
    searchKeyword: '', // 搜索内容
    defaultSearchKeyword: '搜索点什么吧', // 系统推荐搜索内容
    searchHotList: [], // 搜索推荐列表
    searchSuggest: { artists: [], albums: [], songs: [] }, // 搜索联想数据
    showSearchSuggest: false, // 是否显示搜索联想页面
    showSearchResult: false, // 显示搜索结果
    searchResult: { all: {}, song: {}, album: {}, singer: {}, playlist: {} }, // 搜索结果
    searchResultTypeList: [{ title: '综合', index: 1018, name: 'all' }, { title: '歌曲', index: 1, name: 'song' }, { title: '专辑', index: 10, name: 'album' }, { title: '歌手', index: 100, name: 'singer' }, { title: '歌单', index: 1000, name: 'playlist' }],
    searchResultIndex: 1018, // 搜索结果类型
    offset: 0, // 偏移
    limit: 15, // 获取数量
    isLoading: false, // 是否显示loadding
    activeMenuIndex: 0// 结果类型选中索引
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
/**
 * 根据当前选择索引赋值
 * @param {} result
 */
const setSearchResult = result => {
    const res = searchState.searchResultTypeList.filter(type => type.index === searchState.searchResultIndex)
    const type = res[0].name
    if (searchState.searchResultIndex === searchState.searchResultTypeList[0].index) {
        searchState.searchResult[type] = result
    } else {
        const keys = Object.keys(result).filter(str => !str.includes('query'))
        if (keys[0].includes('Count')) {
            searchState.searchResult[type] = { data: result[keys[1]], count: result[keys[0]] }
        } else {
            searchState.searchResult[type] = { data: result[keys[0]], count: result[keys[1]] }
        }
    }
}
const setSearchResultIndex = index => (searchState.searchResultIndex = index)
const setIsLoading = bool => (searchState.isLoading = !!bool)
const setShowSearchResult = bool => (searchState.showSearchResult = !!bool)
const setActiveMenuIndex = index => (searchState.activeMenuIndex = index)
const setResultOffset = offset => (searchState.offset = offset)
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
        setShowSearchResult,
        setSearchResult,
        setSearchResultIndex,
        setIsLoading,
        setActiveMenuIndex,
        setResultOffset,
        resetData
    }
}

let key = true
export const loadMoreResult = () => {
    if (!key) return false
    key = false
    const res = searchState.searchResultTypeList.filter(type => type.index === searchState.searchResultIndex)
    const type = res[0].name
    if (searchState.offset > searchState.searchResult[type].count) {
        key = true
        return false
    }
    searchState.offset += searchState.limit
    getSearchResultSong(searchState.searchKeyword, searchState.searchResultIndex, searchState.offset, searchState.limit).then(({ result }) => {
        const keys = Object.keys(result).filter(str => !str.includes('query'))
        if (keys[1].includes('Count')) {
            searchState.searchResult[type].data = searchState.searchResult[type].data.concat(result[keys[0]])
        } else {
            searchState.searchResult[type].data = searchState.searchResult[type].data.concat(result[keys[1]])
        }
        key = true
    }).catch(() => {
        key = true
    })
}
