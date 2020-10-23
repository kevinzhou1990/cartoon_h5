## 使用方法
1. TextContent: `[type String]`弹窗内容
2. alertType：`[type String]` 弹窗类型 `[default: 'alert',  alert 一个确认按钮，confirm 两个按钮 '确认'、'取消']`
3. options : `[type Object]` 取消或者确认的callback

### 组件式调用
```
this.$dialog(TextContent, alertType, options)
this.$dialog('显示的提示内容','confirm',{
  confirm:{text:'确认按钮文字',callback:'确认按钮执行的方法'},
  cancel:{text:'取消按钮文字',callback:取消按钮执行的方法}
})

```

### 函数式调用

```

import Dialog from '@/common/plugin/dialog'
dialog(TextContent, alertType, options)

dialog('是否确认','confirm', {
   confirm: {text: '确认按钮的文字', callback: () => {}},
   cancel: {text: '取消按钮的文字', callback: () => {}}
})
```

> 类型为 alert 时，可以不传 cancel 回调用函数需要返回一个 boolean 值，用来区分是否关闭弹窗
