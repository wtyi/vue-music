export default (app) => {
    app.directive('load', {
        mounted (el, bingding, vnode) {
            var intersectionObserver = new IntersectionObserver(
                function (entries) {
                    // 如果不可见，就返回
                    if (entries[0].intersectionRatio <= 0) return false
                    bingding.value && typeof bingding.value === 'function' && bingding.value()
                })

            // 开始观察
            intersectionObserver.observe(
                el
            )
            el.intersectionObserver = intersectionObserver
        },
        onMounted (el, bingding, vnode) {
            el.intersectionObserver && el.intersectionObserver.unobserve(el)
        }
    })
}
