export interface IObj {
  time: string;
  基本工资: number;
  加班饭补: number;
  提取公积金: number;
  公积金: number;
  医疗保险: number;
  养老保险: number;
  失业保险: number;
  扣税: number;
  房租: number;
  事假?: number;
}

interface EObj {
  年终: number;
}

type DataObj = IObj | EObj

export type MoneyList = DataObj[]

export const gotKey = ['基本工资', '加班饭补', '提取公积金'] as const

export const lostKey = ['公积金', '医疗保险', '养老保险', '失业保险', '扣税', '房租', '事假'] as const

// 累计预扣预缴个人所得税的计算方法，
// 是指扣缴义务人在一个纳税年度内，以截至当前月份
// 累计支付的工资薪金所得收入额
// -累计基本减除费用
// -累计专项扣除
// -累计专项附加扣除
// -依法确定的累计其他扣除后的余额
// =预缴应纳税所得额

// 对照综合所得税率表，计算出
// 累计应预扣预缴税额-已预扣预缴税额后的余额
// 21500-0
// =作为本期应预扣预缴税额
