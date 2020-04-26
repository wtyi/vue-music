<template>
  <div class="head">
      <div class="back">
          <span @click="routerBack">
              <i class="iconfont icon-fanhui"></i>
          </span>
      </div>
      <div class="search">
          <input type="text">
          <span class="iconfont icon-search"></span>
      </div>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
    setup (props, { emit }) {
        const router = getCurrentInstance().ctx.$router
        const routerBack = function () {
            emit('onBack')
        }

        return {
            routerBack
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.head{
    height: 15vh;
    display: flex;
    align-items: center;
    padding: rem(30) 0;
    background-color: rgb(56, 24, 163);
}

.back{
    width: rem(80);
    text-align: center;
    span{
        background-color:rgba(153,153,153,.2);
        height: rem(33);
        width: rem(33);
        display: inline-block;
        text-align: center;
        line-height: rem(33);
        border-radius: 50%;
        i{
            &::before{
                font-weight: bold;
            }
        }
    }
}

.search{
    width: 80%;
    height: rem(50);
    padding-left:rem(20);
    padding-right: 0;
    background-color:rgba(153,153,153,.2);
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    position: relative;
    input{
        display: inline-block;
        height: 100%;
        outline: none;
        border: none;
        background-color: transparent;
        color: #fff;
        font-weight: 500;
        font-size: 18px;
        padding-left: rem(30);
    }
    span{
        position: absolute;
        left: rem(20);
        top: rem(16);
        font-size: rem(18);
    }
}
</style>
