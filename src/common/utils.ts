import { Cache } from "@raycast/api"

const cache = new Cache()

export const getCache = (key: string) => {
  const cacheData = cache.get(key)
  if(cacheData) {
    return JSON.parse(cacheData)
  }
  return cacheData
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
  return hour >= startHour && hour <= endHour;
}

// 判断时间是否休市 当天下午3点到晚10点+周末
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
  return isWithinTimeRange(targetTime, 19, 22)
}