export default function (time) {
    const s = Math.floor(time / 1000)
    const m = Math.round(s / 60 * 10) / 10
    const arr = m.toString().split('.')
    const left = parseInt(arr[0])
    const right = parseInt(arr[1])
    if (right) {
        const as = right * 60 / 10
        if (as > 9) {
            return `${left}:${as}`
        } else {
            return `${left}:0${as}`
        }
    } else {
        return `${parseInt(left)}:00`
    }
}
