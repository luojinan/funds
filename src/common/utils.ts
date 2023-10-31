import { Cache } from "@raycast/api"
import { html2Markdown } from '@inkdropapp/html2markdown'

const cache = new Cache()

export const removeCache = (key: string) => {
  cache.remove(key)
}

export const getCache = (key: string) => {
  try {
    const cacheData = cache.get(key)
    if(cacheData) {
      return JSON.parse(cacheData)
    }
    return cacheData
  } catch (error) {
    removeCache(key)
    return null
  }
}
export const setCache = (key: string, val: any) => {
  let realVal = val
  if(typeof val === 'string') {
    realVal = JSON.stringify(val)
  }
  cache.set(key, JSON.stringify(realVal))
}


function isWeekend(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

function isWithinTimeRange(date: Date, startHour: number, endHour: number): boolean {
  const hour = date.getHours();
  return hour >= startHour && hour < endHour;
}

// 判断时间是否休市 当天下午3点到晚8点+周末
// date is 2023-01-12 and the time is between 15:00 and 22:00 or it's a weekend day
export const isCloseTime = (time: string) => {
  const currentTime = new Date();
  const isWeekendDay = isWeekend(currentTime);
  if(isWeekendDay) {
    return true
  }
  
  const targetTime = new Date(time);
  const isSameDay = currentTime.toDateString() === targetTime.toDateString();
  if (!isSameDay) {
    return false; // 如果传入时间不是当天，则直接返回false
  }
  return isWithinTimeRange(currentTime, 15, 22)
}

export const isDown = (value: string|undefined) => value?.startsWith("-")

// 涨跌幅（第二天净值 - 第一天净值）/ 第一天净值 * 100%
export const getUpDownPercent = ({newWorth,oldWorth}: {newWorth: number,oldWorth: number}) => {
  const temp = ((newWorth - oldWorth) / oldWorth) * 100 // 单位换算
  const fixedNum = Math.round(temp * 100) / 100 // 四舍五入
  return fixedNum.toFixed(2) // 保留2位小数
}
/**
 * 去除列表中的置顶公告
 * @param htmlStr 
 * @returns 
 */
export const removeTop = (htmlStr: string) => {
  const regex = /<li class="article-list top">.*?<\/li>/g;
  const result = htmlStr.replace(regex, '');
  return result;
}

export const getMdByRegex = (str: string, regex)=> {
  const [matches] = str.match(regex) || [];
  const htmlStr = removeTop(matches)
  const markdownString = html2Markdown(htmlStr);
  return markdownString
}

export const getInfoByStr = (input: string): any => {
  const regex = /- (\d{2}:\d{2})\*\*(.*?)\]\((.*?)\)/;
  const match = input.match(regex);

  if (match) {
    const time = match[1];
    const title = match[2].replace(/^\d+\[?/g, "");
    const [path] = match[3].match(/(.*html)/);

    const jsonData = {
      time: time,
      title: title,
      path: path
    };

    console.log(jsonData)
    return jsonData;
  }

  return {}; // 如果未找到匹配项，返回null或其他适当的错误处理
}
