import { Detail } from "@raycast/api";
import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { html2Markdown } from "@inkdropapp/html2markdown";
import { moneyList } from "./common/moneyData";

const formatter = new Intl.NumberFormat();


export default function Command() {
  const [article, setArticle] = useState("");
  useEffect(() => {
    (async () => {
      const test = moneyList.reduce(
        (res, next) => {
          const gotMoney = res.gotMoney + next.基本工资 + next.加班饭补 + next.提取公积金;
          const lostMoney =
            res.lostMoney +
            next.公积金 +
            next.医疗保险 +
            next.养老保险 +
            next.失业保险 +
            next.扣税 +
            next.房租 +
            (next?.事假 || 0);
          return {
            gotMoney,
            lostMoney,
          };
        },
        { gotMoney: 0, lostMoney: 0 }
      );
      const realGotMoney = test.gotMoney + test.lostMoney;
      console.log(test);
      setArticle(`
${moneyList[0].time} ~ ${moneyList[moneyList.length-1].time}（月数${moneyList.length}）
- 至今总税前收入 ${formatter.format(test.gotMoney)}
- 至今总生活成本支出 ${formatter.format(test.lostMoney)}
- 至今实际收入 ${formatter.format(realGotMoney)}
- 至今平均月入 ${formatter.format(realGotMoney / moneyList.length)}

> - 预计税前年入 ${formatter.format((test.gotMoney/ moneyList.length)*12)}
> - 预计实际年入 ${formatter.format((realGotMoney / moneyList.length)*12)}`);
    })();
  }, []);
  return <Detail markdown={article} />;
}
