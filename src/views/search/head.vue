<template>
    <div class="search-head">
        <div class="search-input">
            <i class="iconfont icon-search"></i>
            <input type="text"
                v-model="searchState.searchKeyword"
                :placeholder="searchState.defaultSearchKeyword"
                @keydown.enter="searchKeyword"
                @input="handleSearchInput"
             />
            <i class="iconfont icon-close" v-if="searchState.searchKeyword && searchState.searchKeyword.length >= 1" @click="handleClearKeyword"></i>
        </div>
        <div class="cancel">
            <span @click="handleCancel">取消</span>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useSearchState, useSearchMethods } from './useSearch'
export default {
    setup (props, { emit }) {
        const router = useRouter()
        const searchState = useSearchState()
        const searchMethods = useSearchMethods()

        const searchKeyword = function () {
            emit('search')
        }
        const handleCancel = function () {
            router.history.go(-1)
        }

        let timer = null
        const handleSearchInput = function () {
            timer && clearTimeout(timer)
            timer = setTimeout(async () => {
                // 如果没有获取结果搜索 则进行联想
                emit('changeSearchSuggest')
            }, 600)
        }

        /**
         * 清除已输入内容 并隐藏联想层
         */
        const handleClearKeyword = function () {
            searchMethods.setSearchKeyword('')
            searchMethods.setShowSearchSuggest(false)
        }

        return {
            searchState,
            searchKeyword,
            handleCancel,
            handleSearchInput,
            handleClearKeyword
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
            // animation: scale .3s;
            // @keyframes scale{
            //     0%{
            //         width: 30%;
            //     }
            //     100%{
            //         width: 100%;
            //     }
            // }
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
