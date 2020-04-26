import Main from './index.vue'
import { createApp } from 'vue'
let instance
let wrap
// const instances = []
let seed = 1
const Modal = function (opation) {
    if (instance) {
        instance.unmount()
    }
    const id = `music_modal_${seed++}`
    instance = createApp(Main, { content: opation.content })
    instance.id = id
    if (!wrap) {
        wrap = document.createElement('div')
        wrap.className = 'musci_modal_wrap'
    }
    instance.mount(wrap)
    document.body.appendChild(wrap)
}

const show = function (title) {
    Modal({ content: title })
}

const hide = function () {

}

export default {
    show,
    hide
}
