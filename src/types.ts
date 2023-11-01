export interface FundData {
  // 基金代码
  code: string;
  // 基金名称
  name: string;
  // 基金类型
  type: string;
  // 当前基金单位净值
  netWorth: number;
  // 当前基金单位净值估算
  expectWorth: number;
  // 当前基金累计净值
  totalWorth: number;
  // 当前基金单位净值估算日涨幅,单位为百分比
  expectGrowth: string;
  // 单位净值日涨幅,单位为百分比
  dayGrowth: string;
  // 单位净值周涨幅,单位为百分比
  lastWeekGrowth: string;
  // 单位净值月涨幅,单位为百分比
  lastMonthGrowth: string;
  // 单位净值三月涨幅,单位为百分比
  lastThreeMonthsGrowth: string;
  // 单位净值六月涨幅,单位为百分比
  lastSixMonthsGrowth: string;
  // 单位净值年涨幅,单位为百分比
  lastYearGrowth: string;
  // 起购额度
  buyMin: number;
  // 原始买入费率,单位为百分比
  buySourceRate: number;
  // 当前买入费率,单位为百分比
  buyRate: number;
  // 基金经理
  manager: string;
  // 基金规模及日期,日期为最后一次规模变动的日期
  fundScale: string;
  // 净值更新日期,日期格式为yy-MM-dd HH:mm.2019-06-27 15:00代表当天下午3点
  worthDate: string;
  // 净值估算更新日期,,日期格式为yy-MM-dd HH:mm.2019-06-27 15:00代表当天下午3点
  expectWorthDate: string;
  // 每万分收益(货币基金)
  millionCopiesIncome: number;
  // 七日年化收益更新日期(货币基金)
  millionCopiesIncomeDate: string;
  // 七日年化收益(货币基金)
  sevenDaysYearIncome: number;
}
