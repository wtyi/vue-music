export default function (count) {
    if (count < 10000) {
        return `${count}次`
    }
    const num = Math.floor(count / 10000)
    return `${num}万次`
}
