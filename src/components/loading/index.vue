<template>
  <div class="loading" v-if="show" :class="classes">
      <img src="@/assets/images/loadding.gif" alt="loadding">
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    setup (props, ctx) {
        const show = ref(props.show)
        const classes = ref('')
        watchEffect(() => {
            document.body.style.overflow = props.show === true ? 'hidden' : 'auto'
            if (props.show === true) {
                show.value = props.show
            } else {
                classes.value = 'hide'
                setTimeout(() => {
                    show.value = false
                }, 500)
            }
        })
        return {
            show,
            classes
        }
    }
}
</script>

<style lang="scss" scoped>
.loading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background-color: rgba(69, 55, 65, 1.000);
    img{
        max-width: 85%;
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%,-50%);
    }
    &.hide{
        transition: all .5s;
        opacity: 0;
    }
}
</style>
