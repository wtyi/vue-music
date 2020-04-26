import { reactive } from 'vue'

function useState () {
    const state = reactive({
        audio: null, // video标签
        audioUrl: '', // 链接
        songList: [], // 歌曲列表
        playSong: null, // 当前播放歌曲信息
        showModal: false, // 是否显示底部那个啥
        status: false, // 是否正在播放
        timer: null, // 定时器
        time: 0.1, // 当前歌曲播放百分比,
        mode: 'loop' // 默认循环 切换随机
    })

    return state
}

export default useState()
