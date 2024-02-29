import { Action, ActionPanel, Detail, showToast } from "@raycast/api";
import { useEffect, useState } from "react";
import { gotKey, lostKey } from "./common/moneyData";
import fetch from "node-fetch";
import { CACHE_KEY_INCOME } from "./common/const";
import { getCache, setCache } from "./common/utils";

const formatter = new Intl.NumberFormat();

// 使用reduce求和
function sum(arr: (number | undefined)[]) {
  return arr.reduce((pre = 0, cur = 0) => {
    return pre + cur;
  }, 0)
}

const umdUrl = 'https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/data/incomeData.js'

const getDataFetch = () => {
  return fetch(umdUrl)
  .then((res) => res.text())
  .then((text) => {
    const res = text.replace('window','global')
    eval(res);
    incomeDataList.push({年终: 52374})
  })
  .catch((err) => {
    console.error('发生错误:', err);
  });
}

const getData = async () => {
  const cacheIncome = getCache(CACHE_KEY_INCOME) || [];
  if(cacheIncome.length) {
    showToast({
      title: "来源缓存",
    });
    return cacheIncome
  }else {
    showToast({
      title: "来源OSS",
    });
    await getDataFetch()
    setCache(CACHE_KEY_INCOME, incomeDataList);
    return incomeDataList
  }
}

export default function Command() {
  const [incomeMoneyDetail, setIncomeMoneyDetail] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const init = async () => {
    setIsLoading(true)
    const incomeDataRes = await getData()
    setIsLoading(false)
    const test = incomeDataRes.reduce((res, next) => {
      if(!next.time) {
        return res
      }
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

    const timeList = incomeDataRes.filter(item=>!!item.time)
    const timeTitle = `${timeList[0].time} ~ ${timeList[timeList.length - 1].time}（月数${timeList.length}）`

    const extraIncomeList = incomeDataRes.filter(item=>!item.time)

    const extraIncome = extraIncomeList.reduce((extraTotal, next) => {
      return extraTotal + next.年终
    }, 0);

    setIncomeMoneyDetail(`
${timeTitle}
- 至今税前总收入 ${formatter.format(test.gotMoney)}
- 至今税金房租总支出 ${formatter.format(test.lostMoney)}
- 至今到手总收入 ${formatter.format(realGotMoney)}
- 至今平均到手月入 ${formatter.format(realGotMoney / timeList.length)}

- 年终 ${formatter.format(extraIncome)}
- 年终换算为月均 ${formatter.format(extraIncome/12)}
- 年终后到手总收入 ${formatter.format(extraIncome+realGotMoney)}
- 年终后平均到手月入 ${formatter.format((extraIncome /12 )+ (realGotMoney) / timeList.length)}

> - 预计税前年入 ${formatter.format((test.gotMoney / timeList.length) * 12)}
> - 预计到手年入 ${formatter.format((realGotMoney / timeList.length) * 12)}
> - 年终后预计到手年入 ${formatter.format(extraIncome + ((realGotMoney / timeList.length) * 12))}`);
  }

  useEffect(() => {
    init()
  }, []);

  // TODO: 可视化图表
  return <Detail
    isLoading={isLoading}
    markdown={incomeMoneyDetail}
    actions={
      <ActionPanel title="Game controls">
        <Action
          title="Refresh"
          shortcut={{ modifiers: ["cmd"], key: "r" }}
          onAction={() => {
            setCache(CACHE_KEY_INCOME, [])
            init()
          }}
        />
      </ActionPanel>
    }
  />;
}
