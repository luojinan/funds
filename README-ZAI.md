# AI

## 请求

手动在浏览器登录后，取出 `cookie` 用于请求接口

```ts
const response = await fetch(AI_HOST, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Cookie: "sso_uid=***; sso_code=***; sso_company_code=*; kid=***"
  },
  body: JSON.stringify({
    options: { parentMessageId: "chatcmpl-8GMcVvSSCXxIyxNLukW91mDcorSiG" },
    prompt,
  })
});
```

使用 `TextDecoder` 解析流数据成字符串

```js
const Tool = new TextDecoder()
const str = Tool.decode(xxArrayBuffer)
return JSON.parse(str)
```

我们发现接口返回的是流式数据，这样获取到的数据是响应结束后的完整数据

这也符合常见的接口loading响应，但是接口即然支持流失输出，loading过程也会更友好

## 流式输出

👇 `response.body` 是 `可迭代数据` 的，遍历每一段流数据转化字符串输出即可

```ts
for await (const chunk of response.body) {
  const str = new TextDecoder().decode(chunk as ArrayBuffer);
  const res = JSON.parse(`${str}`);
  callback(res); // ✨ do something like render
  if (res.detail.choices[0].finish_reason === "stop") {
    done && done(); // ✨ (no necessary) do something when all render done like auto copy or toast info
  }
}
```
🤖💬 介绍一下js的可迭代数据的概念和原理：

> 在 JavaScript 中，可迭代数据是指能够被迭代（遍历）的数据结构。这些数据结构包括字符串、数组、Map、Set 等。可迭代数据的基本原理是实现可迭代接口（Iterable Interface），这个接口定义了一个 `Symbol.iterator` 方法，该方法返回一个迭代器对象（Iterator Object）。

> 迭代器对象是另一个实现了迭代器接口（Iterator Interface）的对象。迭代器接口中最重要的方法是 `next()`，每次调用它都会返回一个包含两个属性的对象：`value` 和 `done`。`value` 表示当前位置的值，而 `done` 是一个布尔值，表示是否已经遍历到结尾。

> 迭代过程基于以下原理：
>
> 1. 对于可迭代数据结构，通过访问其内部的 `Symbol.iterator` 属性来获取迭代器对象。
> 2. 迭代器对象包含一个 `next()` 方法，在每次调用时返回当前位置的值和是否完成迭代的标识。
> 3. 通过不断调用迭代器对象的 `next()` 方法，逐步取得可迭代数据结构中的每个元素，直到 `done` 标识为 `true` 表示迭代结束。

> 以下是一个简单的示例来展示可迭代数据的概念和原理：

```javascript
const iterableData = [1, 2, 3]; // 可迭代数据（数组）

// 获取迭代器对象
const iterator = iterableData[Symbol.iterator]();

// 迭代器对象的 next() 方法返回值包含 value 和 done 属性
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

> 在上述示例中，通过数组 `iterableData` 的 `[Symbol.iterator]()` 方法获取了一个迭代器对象 `iterator`。每次调用 `iterator.next()` 方法可以依次获取数组中的元素值，并根据 `done` 标识来判断是否完成迭代。
> 
> 需要注意的是，可迭代数据和迭代器对象为 JavaScript 中实现迭代功能提供了基础，使我们能够更方便地遍历数组、字符串等数据结构，以及使用 `for...of` 循环来处理可迭代数据。

## Markdown 渲染问题

[`&#x27;` md问题](https://stackoverflow.com/questions/31661712/how-to-represent-markdown-properly-with-escaping-and-line-breaks)

目前发现 `searchMDN` 这个插件也没有处理这个问题

![](https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog202311081609697.png)

查看 [raycast 文档](https://developers.raycast.com/api-reference/user-interface/detail#detail) 是基于 [CommonMark](https://commonmark.org/) 渲染的

只能猜测是这个 `markdown` 解析器的问题，但是目前好像不支持自定义 `markdown` 解析器，比较出名的解析器应该是 `markdown-it` (`vitepress` 中使用)

暂时通过正则把代码块语言去掉，即可显示正常的字符

```js
const markdown= mdStr.replace(/```(js|javascript)/g, '```')
```

## propmt 模版功能

使用 `List.Dropdown`，并设置 plcaeholder

- 起变量名并辅助背单词
