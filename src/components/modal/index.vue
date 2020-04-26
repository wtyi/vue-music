<template>
  <div class="music_modal" v-if="show" :class="{hide:hide}">
      <div class="modal">
          <div class="modal-icon">
              <img :src="imgUrl">
          </div>
          <div class="modal-emoji-text">
              <p>╮(╯_╰)╭</p>
          </div>
          <div class="modal-content">
              <p>{{props.content}}</p>
          </div>
          <div class="modal-close">
              <span class="iconfont icon-close" @click="closeModal"></span>
          </div>
      </div>
      <div class="mask"></div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import imgUrl from '@/assets/images/music.png'
export default {
    props: {
        content: {
            type: String,
            default: '提示'
        },
        show: Object
    },
    setup (props) {
        console.log(props)
        const show = ref(true)
        const hide = ref(false)
        const closeModal = function () {
            hide.value = true
            setTimeout(() => {
                show.value = false
            }, 300)
        }
        watchEffect(() => {
            document.body.style.overflow = show.value === true ? 'hidden' : 'auto'
        })
        return {
            imgUrl,
            props,
            closeModal,
            show,
            hide
        }
    }
}
</script>

<style lang="scss" scoped>
    .music_modal{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        &.hide{
            opacity: 0;
            transition:opacity .3s;
        }
        z-index: 9999;
    }
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        z-index: 2;
    }
    .modal{
        position: absolute;
        top: 12vh;
        left: 50%;
        transform: translateX(-50%);
        z-index: 3;
        max-width: 80%;
        width: 80%;
        padding: 20px;
        background-color: #fff;
        border-radius: 6px;
        animation: .5s show;
        @keyframes show {
            0%{
                opacity: 0;
            }
            100%{
                opacity: 1;
            }
        }
        .modal-icon{
            text-align: center;
            img{
                width: 80%;
                height: 80%;
            }
        }
        .modal-emoji-text{
            p{
                text-align: center;
                font-size: 13px;
                color: #222;
                padding: 10px;
            }
        }
        .modal-content{
            p{
                text-align: center;
                font-size: 16px;
                color: #333;
                padding-top: 10px;
                font-weight: 550;
            }
        }
        .modal-close{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -100px;
            border: 1px solid #f7f7f7;
            border-radius: 50%;
            padding: 5px 6px;
            cursor: pointer;
            span{
                font-size: 16px;
                color: #f7f7f7;
            }
        }
    }

</style>
