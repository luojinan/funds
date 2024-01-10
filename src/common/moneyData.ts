interface IObj {
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

type MoneyList = IObj[]

export const gotKey = ['基本工资', '加班饭补', '提取公积金'] as const

export const lostKey = ['公积金', '医疗保险', '养老保险', '失业保险', '扣税', '房租', '事假'] as const

export const moneyList: MoneyList = [{
  time: '2023.3',
  基本工资: 23000,
  加班饭补: 500,
  提取公积金: 0,

  公积金: -2760,
  医疗保险: -463,
  养老保险: -1840,
  失业保险: -115,
  扣税: -119.16,
  房租: -2100,
},
{
  time: '2023.4',
  基本工资: 23000,
  加班饭补: 400,
  提取公积金: 0,
  公积金: -2760,
  医疗保险: -463,
  养老保险: -1840,
  失业保险: -115,
  扣税: -384.66,
  房租: -2100,
},
{
  time: '2023.5',
  基本工资: 23000,
  加班饭补: 320,
  提取公积金: 1500,
  事假: -1057.47,
  公积金: -2760,
  医疗保险: -463,
  养老保险: -1840,
  失业保险: -115,
  扣税: -352.94,
  房租: -2100,
},

{
  time: '2023.6',
  基本工资: 23000,
  加班饭补: 340,
  提取公积金: 2000,

  公积金: -2760,
  医疗保险: -463,
  养老保险: -1840,
  失业保险: -115,
  扣税: -761.29,
  房租: -2100,
},
{
  time: '2023.7',
  基本工资: 23000,
  加班饭补: 320,
  提取公积金: 2000,

  公积金: -2760,
  医疗保险: -463,
  养老保险: -1840,
  失业保险: -115,
  扣税: -1282.2,
  房租: -2100,
},
{
  time: '2023.8',
  基本工资: 23000,
  加班饭补: 320,
  提取公积金: 2000,
  公积金: -2760,
  医疗保险: -463,
  养老保险: -1840,
  失业保险: -115,
  扣税: -1282.2,
  房租: -2100,
},

{
  time: '2023.9',
  基本工资: 23000,
  加班饭补: 220,
  提取公积金: 2000,
  公积金: -2760,
  医疗保险: -463,
  养老保险: -1840,
  失业保险: -115,
  扣税: -1282.2,
  房租: -2100,
},
{
  time: '2023.10',
  基本工资: 23000,
  加班饭补: 220,
  提取公积金: 2000,
  公积金: -2760,
  医疗保险: -463,
  养老保险: -1840,
  失业保险: -115,
  扣税: -1282.2,
  房租: -2100,
},
{
  time: '2023.11',
  基本工资: 23000,
  加班饭补: 320,
  提取公积金: 2000,
  公积金: -2760,
  医疗保险: -463,
  养老保险: -1840,
  失业保险: -115,
  扣税: -1282.2,
  房租: -2100,
},
{
  time: '2023.12',
  基本工资: 23000,
  加班饭补: 320,
  提取公积金: 2000,
  公积金: -2760,
  医疗保险: -463,
  养老保险: -1840,
  失业保险: -115,
  扣税: -339.66, // 23000 * 1.47%? 23000-专项附加扣除1500
  房租: -2100,
},
]

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
