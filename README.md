# funds

watch funds info

近半年/一年的最低值

接口来源文档: <https://www.doctorxiong.club/api/>

尝试走 <https://www.efunds.com.cn/fund/js_data/fi_017854.json>

TODO: 新增修改自选 1.关注的净值点 2.买入的净值点

TODO: 找出最小的5个净值和日期，计算与当前净值的涨幅，提供手动选择关注的净值点，当接近时提示
关注逻辑为，净值比买入或关注点每下跌 0.2 时补仓or建仓
净值幅度在 +/-0.2 之间，持续时间达到 3个月(暂定/更长)时补仓or建仓

当然，前提是 基金本身值得长期投资，夕阳板块不值得这么关注，当然是不是夕阳板块的看法很主观

正则匹配任意字符用 `([\s\S]*)`
`(.*?)` 匹配不到换行

TODO:

- 笔记
- Hooks 抽离
- 源码学习(chatGpt、mastodon)
