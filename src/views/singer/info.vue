<template>
  <div class="singer_info">
      <div class="left">
          <i class="iconfont icon-shandian"></i>
      </div>
      <div class="right" v-if="singerInfo">
          <h1>{{  singerInfo.alias && singerInfo.alias[0] || singerInfo.name}}</h1>
          <p>{{ singerInfo.briefDesc}}</p>
     </div>
  </div>
</template>

<script>
export default {
    props: {
        singerInfo: {
            type: Object
        }
    },
    setup (props) {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.singer_info{
    height: 32vh;
    padding: rem(20);
    display: flex;
    background-color: rgb(56, 24, 163);
}
.left{
    width: 20%;
    line-height:32vh;
    i{
        font-size: rem(22);
        color: rgba(153,153,153,1);
    }
}
.right{
    width: 80%;
    text-align: center;
    h1{
        font-size: rem(30);
        font-weight: bold;
        padding: rem(20) 0;
    }
    p{
        font-size: rem(12);
        line-height: rem(20);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
        font-weight: 500;
    }
}
</style>
