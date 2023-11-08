# ProTable

简单的脚本工具使用 [script-commands - github](https://github.com/raycast/script-commands) 优于使用插件 extends

表格项以顿号`、`分隔，生成非搜索项的 `ProTable` 列

![](https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog202311071916398.png)

`cmd + shift + c` 复制内容

输入 `名称、创建人、创建时间` 回车得到👇

```js
{
  title: '名称',
  dataIndex: 'key1',
  hideInSearch: true
},
{
  title: '创建人',
  dataIndex: 'key2',
  hideInSearch: true
},
{
  title: '创建时间',
  dataIndex: 'key3',
  hideInSearch: true
},
```

TODO: 
- 匹配 `时间` 自动添加一项 `选择日期区间的搜索项`
- 匹配 首列`序号` 生成 `Index`
- 匹配 末尾`操作` 生成 `查看、编辑`按钮