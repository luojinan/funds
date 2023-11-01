import { Detail, ActionPanel, Action, Clipboard, showToast, Toast } from "@raycast/api";
import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { html2Markdown } from "@inkdropapp/html2markdown";

export default function Command({ path, title }) {
  const [article, setArticle] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [link, setLink] = useState("");
  const [dLink, setDLink] = useState("");
  const getDetail = () => {
    const api = `http://new.xianbao.fun${path}`;
    setLink(api);
    return fetch(api).then((item) => {
      return item.text();
    });
  };

  const onCopy = (text) => {
    if (!text) {
      return showToast({
        title: "复制失败",
        style: Toast.Style.Failure,
      });
    }
    Clipboard.copy(text);
    showToast({
      title: "复制成功",
      message: text,
    });
  };
  const getDLink = (text: string) => {
    const regex = /\*\*原文地址：\*\*\[(.*?)\]/;
    const [, match] = text.match(regex) || [];
    return match;
  };

  const dealMdImgSize = (text: string) => {
    const regex = /(jpg|png|webp)/g;
    return text.replace(regex, "$&?raycast-width=250");
  };
  const dealMdUser = (text: string) => {
    const regex = /\d{4}年\d{1,2}月\d{1,2}日\s\d{1,2}:\d{2}/;
    const [date] = text.match(regex) || [];
    const [, content] = text.split("[举报](javascript:;)");
    return `# ${title} \n ${date}${content}`;
  };
  const getComment = (htmlStr) => {
    const regex = /<div class="c-neirong">(.*?)<\/div>/g; // 匹配 <div class="c-neirong">内容</div> TODO: 嵌套div问题
    const matches = htmlStr.matchAll(regex);
    const list = [];
    for (const match of matches) {
      const filterText = /(d{2,})|谢谢姐妹|滴滴|谢谢|!|！|\s/gi; // 过滤2个以上的d和谢谢
      const content = match[1].replace(filterText, "");

      if (content) {
        const regex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/gi; // 匹配<img>标签以及其src属性的值
        const matches = content.match(regex) || []; // 获取所有匹配的<img>标签

        const [srcValues] = matches.map((match) => {
          const matchRegex = /src\s*=\s*['"]([^'"]+)['"]/i; // 匹配src属性的值
          const src = match.match(matchRegex)[1]; // 提取src属性的值
          return src;
        });

        const result = content.replace(regex, ""); // 移除匹配到的<img>标签
        if (!["d", "D", "牛", "，"].includes(result)) {
          console.log(result);
          list.push({ text: result, icon: srcValues });
        }
      }
    }
    return list;
  };

  const test = (str: string) => {
    const regex = /\*\*原文地址：\*\*\[(.*?)\]\((.*?)\)/;
    const match = str.match(regex);
    if (match) {
      const content = match[1];
      return str.replace(regex, `原文地址: ${content}`).replace('智能AI助手提醒您','智能AI助手提醒您(这是😡💢返利链接)');
    } else {
      return str;
    }
  }

  // TODO: 1. 评论面板 2. 打开链接 3. 复制内容
  useEffect(() => {
    (async () => {
      const res = await getDetail();
      const regex = /<article.*?<\/article>/g;
      const [matches] = res.match(regex) || [];
      const markdownString = html2Markdown(matches);
      const filterText1 = "复制文案重新抓取";
      const filterText2 =
        "**版权声明：**本快照抓取源于网络，临时存储未经验证，请自行甄别，谨防受骗！如有侵权、不良信息请第一时间举报或联系我删除！";
      const resMd = dealMdUser(
        dealMdImgSize(markdownString.replace(filterText1, "").replace(filterText2, "").replace(/d{2,}/g, "").replace(/\n{3,}/g, '\n\n').replace(/\n+$/, ''))
      );
      const url = getDLink(resMd);
      setDLink(url);
      setArticle(resMd);
      const list = getComment(res);
      setCommentList(list);
    })();
  }, []);
  return (
    <Detail
      markdown={article}
      actions={
        <ActionPanel title="Game controls">
          <Action title="Copy Md" shortcut={{ modifiers: ["cmd"], key: "c" }} onAction={() => onCopy(test(article))} />
          <Action title="Copy Link" shortcut={{ modifiers: ["cmd"], key: "x" }} onAction={() => onCopy(link)} />
          <Action
            title="Copy DLink"
            shortcut={{ modifiers: ["cmd"], key: "d" }}
            onAction={() => onCopy(`${title} ${dLink}`)}
          />
        </ActionPanel>
      }
      metadata={
        <Detail.Metadata>
          {commentList.map((item, index) => {
            return <Detail.Metadata.Label key={index} title="评论" text={item.text} icon={item.icon} />;
          })}
        </Detail.Metadata>
      }
    />
  );
}
