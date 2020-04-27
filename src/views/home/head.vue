<template>
    <!-- 首页顶部搜索 -->
    <header class="header">
        <div class="wrap">
            <div class="menu">
                <i class="iconfont icon-menu"></i>
            </div>
            <div class="search">
                <input
                    type="text"
                    placeholder="search value"
                    v-model="state.searchVal"
                    @click="triggerSearch"
                />
                <i class="iconfont icon-search"></i>
            </div>
        </div>
    </header>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup (...props) {
        const state = reactive({
            searchVal: ''
        })
        const router = useRouter()
        // 搜索歌曲
        const triggerSearch = function () {
            router.push({ name: 'search' })
        }
        return {
            state,
            triggerSearch
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    .wrap {
        display: flex;
        flex: 1;
        padding: 20px 0;
        justify-content: space-between;
        align-content: center;
        div {
            width: 50%;
        }
        .menu {
            i {
                font-size: 20px;
                font-weight: 500;
                color: #bbb;
                line-height: 1.5;
            }
        }
        .search {
            position: relative;
            input {
                width: 100%;
                max-width: 100%;
                outline: none;
                background-color: rgba(43, 45, 56, 0.8);
                border: none;
                border-radius: 3px;
                padding: 8px 1px 8px 30px;
                color: #bbb;
                font-size: 13px;
                &::-webkit-input-placeholder {
                    /* WebKit browsers 适配谷歌 */
                    color: #bbb;
                }
            }
            i {
                color: #aaa;
                position: absolute;
                top: 50%;
                left: 10px;
                transform: translateY(-50%);
                font-size: 13px;
                line-height: 1.5;
            }
        }
    }
}
</style>
