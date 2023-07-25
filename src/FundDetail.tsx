import { Detail } from "@raycast/api";
import { FundData } from "./types";

interface Props {
  fundData: FundData
}

// TODO: 录入已经买入的值 并 根据 涨/跌幅提示买入/卖出
const showList = {
  worthDate: '净值更新日期',
  netWorth: '当前基金单位净值',
  expectWorthDate: '净值估算更新日期',
  expectWorth: '当前基金单位净值估算',
  totalWorth: '当前基金累计净值',
  expectGrowth: '单位估值日涨幅,单位为百分比',
  dayGrowth: '日涨幅(单位净值),单位为百分比',
  lastWeekGrowth: '周涨幅(单位净值),单位为百分比',
  lastMonthGrowth: '月涨幅(单位净值),单位为百分比',
  lastThreeMonthsGrowth: '三月涨幅(单位净值),单位为百分比',
  lastSixMonthsGrowth: '六月涨幅(单位净值),单位为百分比',
  lastYearGrowth: '年涨幅(单位净值),单位为百分比',
  manager: '基金经理',
  millionCopiesIncome: '每万分收益(货币基金)',
  millionCopiesIncomeDate: '七日年化收益更新日期(货币基金)',
  sevenDaysYearIncome: '七日年化收益(货币基金)',
}

const getEmoji = (value: string) => {
  // 没找到自定义样式的办法，使用 emoji
  let emoji = '🥳'
  if(value.startsWith('-')) {
    emoji = '🤢'
  }
  return emoji
}

// 定义一个辅助函数，通过泛型推导Object.keys类型
function getObjectKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

export default function FundDetail({fundData}: Props) {
  const valueMap = new Map(Object.entries(fundData))
  const res = getObjectKeys(showList).map(key=>{
    let label = showList[key]
    let value = valueMap.get(key)
    if(!value) return ''

    if(label.includes(',单位为百分比')) {
      const emoji = getEmoji(value)
      value = `\`${value}%\` ${emoji}`
      label = label.split(',单位为百分比')[0]
    }
    return `- ${label}: ${value}`
  }).join('\n')

  return (
    <Detail
      markdown={res}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="基金名称" text={fundData.name} />
          <Detail.Metadata.Label title="基金类型" text={fundData.type} />
          <Detail.Metadata.Label title="基金规模及日期" text={fundData.fundScale} />
        </Detail.Metadata>
      }
    />
  )
}