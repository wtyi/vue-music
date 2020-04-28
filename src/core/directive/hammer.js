import Hammer from 'hammerjs'
/**
 * 手势封装指令 v-hammer
 * swiper 滑动
 * pan 拖拽
 * @param {*} app
 */
function hammer (app) {
    app.directive('hammer', {
        mounted (el, bingding, vnode) {
            if (bingding.arg === 'swipe') {
                const heamertime = new Hammer(el, {})
                if (bingding.modifiers.down === true) {
                    heamertime.get('swipe').set({ direction: Hammer.DIRECTION_DOWN })
                } else if (bingding.modifiers.left === true) {
                    heamertime.get('swipe').set({ direction: Hammer.DIRECTION_LEFT })
                }

                heamertime.on('swipe', function (e) {
                    bingding.value && bingding.value(e)
                })
            } else if (bingding.arg === 'pan') {
                const heamertime = new Hammer(el, {})
                heamertime.on('panstart', function (e) {
                    bingding.value && typeof bingding.value[0] === 'function' && bingding.value[0](e)
                })
                heamertime.on('panmove', function (e) {
                    bingding.value && typeof bingding.value[1] === 'function' && bingding.value[1](e)
                })
                heamertime.on('panend', function (e) {
                    bingding.value && typeof bingding.value[2] === 'function' && bingding.value[2](e)
                })
            }
        }
    })
}

export default hammer
