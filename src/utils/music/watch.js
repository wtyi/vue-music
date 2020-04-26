import state from './state'
import { watch } from 'vue'

watch(() => state.audio, (val) => {
    console.log('标签设置了')
})

watch(() => state.songList, (val) => {
    console.log('批量添加歌曲列表了')
})

watch(() => state.playSong, (newSongInfo) => {
    console.log(newSongInfo)
    console.log('歌曲关闭或者开始了')
})

watch(() => state.audioUrl, (url) => {
    console.log('歌曲url被改变了')
})

watch(() => state.showModal, (status) => {
    console.log('model状态改变', status)
})

watch(() => state.status, (status) => {
    console.log('更改歌曲播放状态', status)
})

watch(() => state.timer, (status) => {
    console.log('计时器改变了', status)
})

export {}
