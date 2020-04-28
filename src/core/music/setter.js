import state from './state'
import { getPlaySongUrl } from '@/request/api'
import Modal from '@/components/modal/index.js'

/**
 * 设置页面audio元素
 * @param {Element} audio dom元素
 */
export const setAudio = function (audio) {
    audio && (state.audio = audio)
    state.audio.oncanplay = function () {
        console.log(1)
        changePlayStatus(true)
    }
}

/**
 * 设置播放列表
 * @param {array} songList 歌曲列表
 */
const feeStatus = [0, 8]
let beforeSongList = []
export const setSongList = function (songList) {
    if (state.playSong && (!songList.value || songList.value.some(song => song.id === state.playSong.id))) {
        return false
    }
    beforeSongList = state.songList
    songList && (state.songList = songList.value.filter(song => feeStatus.includes(song.fee)))// 8免费 1好像会员
}

/**
 * 改变播放状态和显示图标状态
 * @param {boolean} status 状态 不设置去反值
 */
export const changePlayStatus = function (status = null) {
    state.timer && clearInterval(state.timer)
    status == null ? (state.status = !state.status) : (state.status = status)
    if (state.status) {
        state.audio.play()
        setSongTimeInterval()
    } else {
        state.audioUrl && state.audio && state.audio.pause()
    }
}

/**
 * 设置当前播放音乐信息
 * @param {object} song 单首音乐信息
 */
export const setPlaySong = async function (song) {
    if (state.playSong && song.id === state.playSong.id) {
        return false
    }
    // 当成功获取音乐URL后才会赋值信息
    const songResult = await getSongInfoById(song.id)
    if (typeof songResult === 'object') {
        state.playSong = song
        changePlayStatus(false)
        state.audioUrl = songResult.url
        !state.showModal && (state.showModal = true)
        state.status = true
        // ios上不能触发事件不自动播放等原因兼容。。
        setTimeout(() => {
            if (state.audio.paused) {
                state.audio.pause()
                state.audio.play()
            }
        }, 800)
    } else {
        // 如果此次歌曲为不可播放则回滚下上的列表数据
        state.songList = beforeSongList
        // 显示错误信息
        console.error(songResult)
        // 显示弹窗
        Modal.show(songResult)
    }
}

/**
 * 播放下一首
 */
export const playNextSong = function () {
    if (!state.songList || state.songList.length <= 1) {
        return false
    }
    let currentIndex = null
    state.songList.forEach((song, index) => {
        if (song.id === state.playSong.id) {
            currentIndex = index
        }
    })
    const len = state.songList.length
    if (currentIndex + 1 >= len) {
        return false// 无下一首
    }
    // 播放下一首
    setPlaySong(state.songList[currentIndex + 1])
}

/**
 * 播放上一首
 */
export const playPrevSong = function () {
    if (!state.songList || state.songList.length <= 1) {
        return false
    }
    let currentIndex = null
    state.songList.forEach((song, index) => {
        if (song.id === state.playSong.id) {
            currentIndex = index
        }
    })
    if (currentIndex - 1 < 0) {
        return false// 无上一首
    }
    // 播放上一首
    setPlaySong(state.songList[currentIndex - 1])
}

/**
 * 随机播放一首
 */
export const randomPlaySong = function () {
    if (!state.songList || state.songList.length <= 1) {
        return false
    }
    const len = state.songList.length
    // 取随机数并[去掉自己,暂时没写]
    const randomIndex = Math.round(Math.random() * len)
    setPlaySong(state.songList[randomIndex])
}

/**
 * 根据ID获取音乐链接信息等...
 * @param {*} id
 * @return 成功返回对象 失败返回原因
 */
const getSongInfoById = async (id) => {
    const { code, data } = await getPlaySongUrl(id)
    if (code === 200 && data && data.length >= 1) {
        if (data[0].url && /^(http|https)/g.test(data[0].url)) {
            return data[0]
        // eslint-disable-next-line eqeqeq
        } else if (data && data.length >= 1 && data[0].code == -110) {
            return '该歌曲需要网易云音乐vip'
        } else {
            // 链接获取失败 一般因为无版权
            return 'sorry wyy暂时无版权'
        }
    } else {
        // 获取失败
        return '获取数据失败'
    }
}

/**
 * 当前歌曲进度
 */
export const setSongTimeInterval = function () {
    state.timer && clearInterval(state.timer)
    const times = state.audio.duration
    state.time = state.audio.currentTime ? state.audio.currentTime / times * 100 : 0.1
    state.timer = setInterval(() => {
        const _time = state.audio.currentTime / times * 100
        if (Math.round(_time) >= 100) {
            state.time = 100
            state.timer && clearInterval(state.timer)
            // 结束了单曲播放 根据mode继续下一首
            // 循环播放
            if (state.mode === 'loop') {
                playNextSong()
            } else if (state.mode === 'random') {
                randomPlaySong()
            }
        } else {
            state.time = _time
        }
    }, 1000)
}

/**
 * 设置显示底部music
 * @param {bool} val
 */
export const setShowMusicModal = function (val) {
    state.showModal = !!val
}

/**
 * 设置播放顺序 随机 or 循环
 */
export const setPlayMode = function (mode) {
    state.mode = mode === 'loop' ? 'loop' : 'random'
}

/**
 * 设置歌曲当前播放位置
 * @param {*} time 时间百分比
 */
export const setPlaySongCurrentTime = function (time) {
    // console.log(time, state.audio.duration, time * state.audio.duration)
    // return
    state.audio.currentTime = time * state.audio.duration
    // 更改后会直接播放设置状态
    state.status = true
}

/**
 * 根据传来的百分比设置即将的位置
 * @param {*} time
 */
export const setStateTime = function (time) {
    state.time = time
}

window.state = state
