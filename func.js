(function () {
    // 获取DOM
    var input = document.querySelector('.input')
    var doingbox = document.querySelector('.doing-box')
    var donebox = document.querySelector('.done-box')
    var todobox = document.querySelector('.todo-box')
    // 获取本地数据
    var localData = JSON.parse(localStorage.getItem('toDoList'))
    if (localData === null) {
        // 初始化数组，用于保存完成/待完成的数据
        var dataList = []
    } else {
        // 获取本地数据
        var localData = JSON.parse(localStorage.getItem('toDoList'))
        var dataList = localData
        render()
    }
    // 鼠标按下事件
    input.addEventListener('keydown', handleInput)
    // checkbox改变触发
    todobox.addEventListener('change', handleChangeEvent)
    // 点击事件
    todobox.addEventListener('click', handleDel)

    // input事件
    function handleInput (e) {
        if (e.key === 'Enter') { // 敲回车执行事件
            var value = e.target.value
            var obj = {
                isChecked: false,
                content: value,
                isDone: false
            }
            dataList.push(obj)
            // 将数据存储到本地
            localStorage.setItem('toDoList', JSON.stringify(dataList));
            // 在这里渲染
            render()
            // 输入完毕后清除输入框的内容
            e.target.value = ''
        }
    }

    // 处理渲染页面函数
    function render () {
        // 渲染之前清空内容
        doingbox.innerHTML = ''
        donebox.innerHTML = ''
        // 判断是doing渲染还是done渲染
        dataList.forEach(function (item, index) {
            if (!item.isChecked) {
                // 创建一个元素
                var li = document.createElement('li')
                li.innerHTML = `
                    <div class="item-left">
                        <input type="checkbox" class="checkbox" data-index = "${index}">
                        <span>${item.content}</span>
                    </div>
                    <button class="del" data-index = "${index}">删除</button>
                `
                // 插入一个元素
                doingbox.appendChild(li)
                li.className = 'doing-item'
            } else {
                // 创建一个元素
                var li = document.createElement('li')
                li.innerHTML = `
                    <div class="item-left">
                        <input type="checkbox" class="checkbox" checked="${item.isChecked}" data-index = "${index}">
                        <span>${item.content}</span>
                    </div>
                    <button class="del" data-index = "${index}">删除</button>
                `
                // 插入一个元素
                donebox.appendChild(li)
                li.className = 'done-item'
            }
        })
    }

    // 处理change事件
    function handleChangeEvent (e) {
        var currentindex = e.target.dataset.index
        dataList[currentindex].isChecked = 'checked'
        // render()
        dataList[currentindex].isDone = !dataList[currentindex].isDone
        if (dataList[currentindex].isDone) { //已完成
            render()
        } else { // 未完成
            dataList[currentindex].isDone = false
            // 去除checked状态
            dataList[currentindex].isChecked = false
            render()
        }
        // 将数据存储到本地
        localStorage.setItem('toDoList', JSON.stringify(dataList));
    }

    // 处理删除功能
    function handleDel (e) {
        // 只有当元素为button时才执行删除操作
        if (e.target.nodeName.toLowerCase() === 'button') {
            // 删除提示
            var result = window.confirm('删除要三思啊~~~')
            if (result) {
                // 获取要删除元素的下标
                var activeIndex = e.target.dataset.index
                // 删除对应元素
                dataList.splice(activeIndex, 1)
                // 重新将数组保存到本地
                localStorage.setItem('toDoList', JSON.stringify(dataList));
                // 重新渲染页面
                render()
            }
        }
    }
})()