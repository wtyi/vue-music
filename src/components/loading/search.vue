<template>
    <div class="search_loading">
        <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$leftColor: rgba(115, 36, 245, 1);
$rightColor: rgba(54, 114, 241, 1);
.loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
}
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
}
span {
    width: 5px;
    height: 35px;
    border-radius: 3px;
    margin: 0 3px;
    background: linear-gradient(to top, $leftColor, $rightColor);
    animation: scale 0.3s infinite alternate;

    &:nth-child(1) {
        animation-delay: 0s;
    }
    &:nth-child(2) {
        animation-delay: 0.1s;
    }
    &:nth-child(3) {
        animation-delay: 0.2s;
    }
    &:nth-child(4) {
        animation-delay: 0.3s;
    }
    &:nth-child(5) {
        animation-delay: 0.4s;
    }
    &:nth-child(6) {
        animation-delay: 0.5s;
    }

    @keyframes scale {
        0% {
            transform: scaleY(1);
        }
        100% {
            transform: scaleY(1.5);
        }
    }
}
</style>
