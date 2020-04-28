// 时间格式化 "YYYY-MM-DD HH:mm:SS"
export default (time, type = 'YYYY-MM-DD HH:mm:SS') => {
    const date = new Date(time)
    const year = date.getFullYear()// 年
    const mouth = date.getMonth() + 1// 月
    const day = date.getDate()// 日
    const hours = date.getHours()// 小时
    const M = date.getMinutes()// 分钟
    const S = date.getSeconds()// 秒
    const str = type.replace(/[\w]{2,4}/g, function (str) {
        if (str === 'YYYY') {
            return year
        }
        if (str === 'MM') {
            return (mouth > 9 ? mouth : '0' + mouth)
        }
        if (str === 'DD') {
            return (day > 9 ? day : '0' + day)
        }
        if (str === 'HH') {
            return (hours > 9 ? hours : '0' + hours)
        }
        if (str === 'mm') {
            return (M > 9 ? M : '0' + M)
        }
        if (str === 'SS') {
            return (S > 9 ? S : '0' + S)
        }
    })
    return str
}
