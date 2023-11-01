import { Detail } from "@raycast/api";
import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { html2Markdown } from "@inkdropapp/html2markdown";

export default function Command() {
  const [article, setArticle] = useState("");
  const test = () => {
    const api = "http://new.xianbao.fun/douban-maizu/2352196.html";
    return fetch(api).then((item) => {
      return item.text();
    });
  };
  useEffect(() => {
    (async () => {
      const res = await test();
      const regex = /<article.*?<\/article>/g;
      const [matches] = res.match(regex) || [];
      const markdownString = html2Markdown(matches);
      console.log(markdownString);
      setArticle(markdownString);
    })();
  }, []);
  return <Detail markdown={article} />;
}
