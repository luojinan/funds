import { Detail } from "@raycast/api";
import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { html2Markdown } from '@inkdropapp/html2markdown'

export default function Command({path}) {
  const [article, setArticle] = useState("");
  const test = () => {
    const api = `http://new.xianbao.fun${path}`;
    console.log('api',api)
    return fetch(api).then((item) => {
      return item.text();
    });
  };
  // TODO: 1. 评论面板 2. 打开链接 3. 复制内容
  useEffect(() => {
    (async () => {
      const res = await test();
      const regex = /<article.*?<\/article>/g;
      const [matches] = res.match(regex) || [];
      const markdownString = html2Markdown(matches); // TODO: md图片设置宽度
      const filterText1 = '复制文案重新抓取'
      const filterText2 = '**版权声明：**本快照抓取源于网络，临时存储未经验证，请自行甄别，谨防受骗！如有侵权、不良信息请第一时间举报或联系我删除！'
      const resMd = markdownString.replace(filterText1, '').replace(filterText2, '').replace(/d{2,}/g, '');
      setArticle(resMd);
    })();
  }, []);
  return <Detail markdown={article} />;
}
