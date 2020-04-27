<template>
    <div class="search-head">
        <div class="search-input">
            <i class="iconfont icon-search"></i>
            <input type="text"
                v-model="Keyword"
                :placeholder="props.defaultKeyword"
                @keydown.enter="searchKeyword"
                @input="handleSearchInput"
             />
            <i class="iconfont icon-close" v-if="searchKeyword && searchKeyword.length > 1"></i>
        </div>
        <div class="cancel">
            <span @click="handleCancel">取消</span>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSearchSuggest } from '@/request/api.js'
export default {
    props: {
        defaultKeyword: {
            type: String,
            default: '搜索点什么吧'
        }
    },
    setup (props, { emit }) {
        const Keyword = ref('')
        const router = useRouter()
        const searchKeyword = function () {

        }
        const handleCancel = function () {
            router.history.go(-1)
        }

        let timer = null
        const handleSearchInput = function () {
            timer && clearTimeout(timer)
            timer = setTimeout(async () => {
                if (Keyword.value && Keyword.value.length > 0) {
                    const result = await getSearchSuggest(Keyword.value)
                    emit('changeSearchSuggest', [result.result, Keyword.value])
                } else {
                    emit('changeSearchSuggest', [{ code: -100 }, Keyword.value])
                }
            }, 600)
        }

        return {
            props,
            Keyword,
            searchKeyword,
            handleCancel,
            handleSearchInput
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.search-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: rem(20) 0;
    .cancel {
        padding: rem(10) rem(5);
        span {
            font-size: rem(14);
            font-weight: bold;
            color: #ddd;
            text-align: center;
        }
    }
    .search-input {
        flex: 1;
        position: relative;
        input {
            width: 100%;
            padding: rem(11) rem(30);
            border-radius: 20px;
            outline: none;
            border: none;
            background-color: rgba(102, 100, 99, 0.3);
            color: #ddd;
            font-size: rem(13);
        }
        i {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            color: #ddd;
        }
        i.icon-search {
            left: rem(8);
            font-size: rem(15);
        }
        i.icon-close {
            right: rem(8);
            font-size: rem(11);
        }
    }
}
</style>
