## 使用方法

```
this.$dialog('显示的提示内容，字符串','confirm，弹窗类型，confirm:确认弹窗，alert:警告弹窗',
{
  confirm:{text:'确认按钮文字',callback:'确认按钮执行的方法'},
  cancel:{text:'取消按钮文字',callback:取消按钮执行的方法}
})
```

> 类型为 alert 时，可以不传 cancel 回调用函数需要返回一个 boolean 值，用来区分是否关闭弹窗
