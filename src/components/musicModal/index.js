import { ref, reactive } from 'vue'
export default function useMove (props) {
    const { state, setStateTime, setPlaySongCurrentTime, playNextSong, setSongTimeInterval } = props
    const progressBottomLine = ref(null)
    const progressBtn = ref(null)
    const moveState = reactive({
        btnLeft: 0.1,
        progressBottomLineWidth: 0,
        currentX: 0,
        deltaX: 0
    })
    function moveStart (e) {
        state.timer && clearInterval(state.timer)
        moveState.btnLeft = /(\d)+\.(\d)+/g.exec(progressBtn.value.style.left)[0]
        moveState.progressBottomLineWidth = progressBottomLine.value.clientWidth
        moveState.currentX = moveState.btnLeft * moveState.progressBottomLineWidth / 100
    }
    function moveLeave (e) {
        moveState.deltaX = e.deltaX
        const nextWidth = moveState.currentX + moveState.deltaX
        if (nextWidth <= 0) {
            setStateTime(0)
        } else if (nextWidth >= moveState.progressBottomLineWidth) {
            setStateTime(100)
        } else {
            setStateTime(nextWidth / moveState.progressBottomLineWidth * 100)
        }
    }
    function moveEnd (e) {
        const nextWidth = moveState.currentX + moveState.deltaX
        if (nextWidth <= 0) {
            setPlaySongCurrentTime(0)
        } else if (nextWidth >= moveState.progressBottomLineWidth) {
            playNextSong()
        } else {
            setPlaySongCurrentTime(nextWidth / moveState.progressBottomLineWidth)
        }
        setSongTimeInterval()
    }
    return {
        progressBottomLine,
        progressBtn,
        moveStart,
        moveLeave,
        moveEnd
    }
}
