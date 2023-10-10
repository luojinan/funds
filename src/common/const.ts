export const defaultWatchFundList = [
  {code: '004424', buyinWorth: 1.9262, watchWorth: ''},
  {code: '000968', buyinWorth: 0.9195, watchWorth: ''},
  {code: '003765', buyinWorth: 1.1535, watchWorth: ''},
  {code: '011612', buyinWorth: 0.7017, watchWorth: ''},
  {code: '004752', buyinWorth: 0.8289, watchWorth: ''},
  {code: '003765', buyinWorth: 1.1778, watchWorth: ''},
  {code: '000478', buyinWorth: 2.6115, watchWorth: ''},
  {code: '001180', buyinWorth: 0.8707, watchWorth: ''},
  {code: '519915', buyinWorth: 2.3520, watchWorth: ''},
  {code: '340001', buyinWorth: '', watchWorth: ''},
] // TODO: 表单输入，及json修改

// 获取当前日期并格式化
function getCurrentFormattedDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
const currentDate = getCurrentFormattedDate(); // Output "2023-01-23"

// 接口来源文档: https://www.doctorxiong.club/api/
const HOST = 'https://api.doctorxiong.club/v1'

export const API_FUND_DETAIL = `${HOST}/fund/detail/list?startDate=${currentDate}&code=`

// export const API_FUND_LIST = `${HOST}/fund/detailfund/detail?code=`


export const CACHE_KEY_FUNDLIST = 'fund-list'