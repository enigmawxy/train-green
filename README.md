
## 8-02 Header

- 属性类型校验 `npm i prop-types --save`
- 把样式文件改为scss形式 `npm i node-sass --save`

## 8-03 from to

## 8-04 城市选择浮层-顶部搜索栏
- 安装classnames帮助管理动态类名className. `npm i classnames --save`
- hidden类是在在index.css里定义的
- 需要在Selector.scss里加入 @font-face，清楚查查才能正确显示

## 8-05 城市选择浮层-城市的异步加载
- 使用useEffect来完成任务

## 8-06 城市选择浮层-渲染城市列表

## 8-07 城市选择浮层-字母快速定位

- 生成字母表的方法

## 8-08 城市选择浮层-搜索建议

## 8-09 出发日期控件

- `npm i dayjs --save`

## 8-10 日期选择浮层-搭建

## 8-11 日期选择浮层-日历组件(上)

## 8-12 日期选择浮层-日历组件(下)

## 8-13 只看高铁&动车控件

## 8-14 提交按钮控件

## 9-01/02 数据结构与模块设计(上/下)

- 根据最终实现效果，拆解组件，并编写各组件框架代码，在本例中有Nav、List、Bottom组件。

- 设计本页面的Store 数据结构

- 根据页面编写样式文件

- 完善第一步的代码框架

## 9-03 URL解析与数据请求

- 解析URL, 通过urljs来完成，`npm i urijs --save`

- 通过Fetch和URI实现请求

## 特点

- 在主模块中连接Connect, 与Store打交道，主模块的子模块里的数据以及处理都通过子模块的属性从主模块传入，这样的好处是代码代码看起来整洁、规范，子模块只负责渲染。

- 使用Redux的套路，主要有三个文件actions.js, reducers.js, store.js. store.js定义本模块用到的数据结构，通过Provider挂接到主模块上，实现绑定：

```javascript
import store from './store'

ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
```

- 操作数据结构中的数据，主要由actions.js和reducers.js来完成，actions.js主要是定义操作数据的函数，reducer数据结构中各数据的返回。
