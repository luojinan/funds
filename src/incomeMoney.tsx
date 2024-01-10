import { Detail } from "@raycast/api";
import { useEffect, useState } from "react";
import { gotKey, lostKey, moneyList } from "./common/moneyData";

const formatter = new Intl.NumberFormat();

// 使用reduce求和
function sum(arr: (number | undefined)[]) {
  return arr.reduce((pre = 0, cur = 0) => {
    return pre + cur;
  }, 0)
}

export default function Command() {
  const [incomeMoneyDetail, setIncomeMoneyDetail] = useState('');

  useEffect(() => {
    (async () => {
      const test = moneyList.reduce((res, next) => {
        // 将 gotKey 数组映射成 gotMoneyList 数组
        const itemGotMoneyList = gotKey.map(item => next[item])
        // 将 lostKey 数组映射成 lostMoneyList 数组
        const itemLostMoneyList = lostKey.map(item => next[item])

        // 计算获得的总金额
        const gotMoney = res.gotMoney + (sum(itemGotMoneyList) || 0)
        // 计算损失的总金额
        const lostMoney = res.lostMoney + (sum(itemLostMoneyList) || 0)
        // 返回包含获得金额和损失金额的对象
        return {
          gotMoney,
          lostMoney,
        };
      }, { gotMoney: 0, lostMoney: 0 });
      const realGotMoney = test.gotMoney + test.lostMoney;
      const timeTitle = `${moneyList[0].time} ~ ${moneyList[moneyList.length - 1].time}（月数${moneyList.length}）`

      setIncomeMoneyDetail(`
${timeTitle}
- 至今税前总收入 ${formatter.format(test.gotMoney)}
- 至今税金房租总支出 ${formatter.format(test.lostMoney)}
- 至今到手总收入 ${formatter.format(realGotMoney)}
- 至今平均到手月入 ${formatter.format(realGotMoney / moneyList.length)}

> - 预计税前年入 ${formatter.format((test.gotMoney / moneyList.length) * 12)}
> - 预计到手年入 ${formatter.format((realGotMoney / moneyList.length) * 12)}`);
    })();
  }, []);

  // TODO: 可视化图表
  return <Detail markdown={incomeMoneyDetail} />;
}
