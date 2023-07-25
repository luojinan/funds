export const defaultWatchFundList = ['004424','000968'] // TODO: 表单输入，及json修改

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