/**
 * 改变动画
 * class hidden 即将隐藏的 move 其他需要移动的 index分配默认类名
 * @param {*} state 响应数据
 * @param {} time 动画时间
 * @param {*} callback 执行完毕回调
 */
let MoveKey = true // 锁🔐

export default function (state, time, callback) {
    if (MoveKey) {
        MoveKey = false
        Move(state, time, callback)
    }
}

function Move (state, time, callback) {
    // 进行动画
    state.albums && state.albums.forEach((album) => {
        if (album.index === 0) {
            album.class = `hidden item${state.albums.length}`
        } else {
            album.class = `move item${album.index}`
        }
    })
    // 动画结束取消所有动画期间的类名
    setTimeout(() => {
        state.albums && state.albums.forEach(album => {
            album.index = album.index === 0 ? state.albums.length - 1 : album.index - 1
            album.class = album.class.replace(/move/g, '').replace(/hidden/g, '')
        })
        callback && callback()
        MoveKey = true
    }, time)
}
