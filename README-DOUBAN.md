
# douban

## 列表 List

### 数据处理
列表数据从 `XIANBAO_HOST` 中，获取出 `html` 内容

使用 fetch 做 get 请求，和普通的json 不同`resp.json()`，获取html内容使用 `resp.text()` 

```ts
const getHtmlStr = (url: string) => {
  return fetch(url).then((resp) => {
    return resp.text(); // ✨
  });
};
```

获取 html 字符串后，使用正则匹配出需要的 html 部分 `<ul class="new-post"></ul>`

> 注意，这里因为 `<ul class="new-post"></ul>` 在完整页面内容里是唯一的，因此可以匹配出希望的内容
> 
> 当没有这种dom时，如 `<div id="xx"></div>` ，虽然id是唯一的，但是匹配不到相应的结束 `</div>`
>
> 此时可以考虑 解析html的第三方库，如 [cheerio - npm](https://www.npmjs.com/package/cheerio) 可以让解析后的html，提供类似选择器的功能

再把 ul 的列表内容 html字符，转化为 markdown 语法，精简出想要的内容

再从 markdown 字符中，提取(正则)列表的每一项内容，分字段存储成 JSON

到这一步，基本的列表查看功能就实现了

### 渠道功能
再实现渠道功能，使用 raycast 提供的 `<List.Dropdown>` 放到 `<List>` 组件的 `searchBarAccessory` 属性里

```tsx
return (
  <List
    isLoading={isLoading}
    searchBarAccessory={<SearchDropdown title="渠道" optionList={channelList} onChange={onChannelChange} />}
  >
    {/* ... */}
  </List>
)
```

### Action面板 去详情/复制列表数据

设置 `{ modifiers: ["cmd", "shift"], key: "c" }` 为复制快捷键，用`@raycast/api` 的 `Clipboard.copy()` 实现复制

```tsx
<List.Item
  actions={
    <ActionPanel>
      <Action.Push title="Detail Info" target={<ZoyeDetail path={item.path} title={item.title} />} />

      <Action
        title="Copy List"
        shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
        onAction={() => onCopy(list.map(({title, path}, index)=>`${index+1}. ${title}: ${XIANBAO_HOST}${path}`).join('\n\n'))}
      />
    </ActionPanel>
  }
/>
```

## 详情 Detail

## 数据处理

## 评论展示

## Action面板 复制/浏览器打开原链接
