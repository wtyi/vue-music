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
