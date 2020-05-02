import axios from './http'

/**
 * 获取首页最新专辑
 */
export const getIndexNewAlbum = () => {
    return axios.get('album/newest')
}

/**
 * 获取推荐音乐 就当做近期流行使用了...
 */
export const getNewSong = () => {
    return axios.get('/personalized/newsong')
}

/**
 * 获取热门歌手前*名  作为推荐歌手使用
 */
export const getTopSinger = (params = { offset: 0, limit: 30 }) => {
    return axios.get('/top/artists', { params: params })
}

/**
 * 获取歌手部分单曲
 * @param {} id
 */
export const getSingerSongs = (id) => {
    return axios.get('/artists', { params: { id } })
}

/**
 * 根据歌曲ID获得播放url地址
 * @param {} id
 */
export const getPlaySongUrl = (id) => {
    return axios.get('/song/url', { params: { id } })
}

/**
 * 获取专辑内容 与专辑信息
 */
export const getAlbumInfo = (id) => {
    return Promise.all([
        axios.get('/album', { params: { id } }),
        axios.get('/album/detail/dynamic', { params: { id } })
    ])
}

/**
 * 获取搜索热词
 */
export const getSearchHot = () => {
    return axios.get('/search/hot/detail')
}

/**
 * 获取默认搜索建议词
 */
export const getSearchDefaultKeyword = () => {
    return axios.get('/search/default')
}

/**
 * 搜索建议
 */
export const getSearchSuggest = (keywords) => {
    return axios.get('/search/suggest', { params: { keywords } })
}

/**
 * 根据关键字与类型搜索 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * @param {e} keywords
 * @param {*} type
 */
export const getSearchResultSong = (keywords, type, offset = 0, limit = 15) => {
    return axios.get('/search', { params: { keywords, type, offset, limit } })
}

/**
 * 获取歌单内容
 * @param {} id
 */
export const getPlaylistInfo = id => {
    return axios.get('/playlist/detail', { params: { id } })
}

/**
 * 获取首页精品歌单
 */
export const getIndexPlaylist = () => {
    return axios.get('/top/playlist/highquality')
}
