function resize () {
    // 1rem = 100px
    var designWidth = 750 // 设计稿的宽度
    var rootFontSize = 100 // 将html root的font-size设置为100px
    document.documentElement.style.fontSize = rootFontSize + 'px'
    var width = document.documentElement.clientWidth // 屏幕尺寸
    var fontSize;
    fontSize = (width / designWidth) * rootFontSize // 模拟器上的实际字体大小
}

window.onresize = resize // 屏幕尺寸大小变化时触发
document.addEventListener('DOMContentLoaded', resize, false) // 文档加载完时时触发