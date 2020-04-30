export default function (count, type = '次') {
    if (type === false) {
        type = ''
    }
    if (count < 10000) {
        return `${count}${type}`
    }
    const num = Math.floor(count / 10000)
    return `${num}万${type}`
}
