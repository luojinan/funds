import { API_FUND_DETAIL, CACHE_KEY_FUNDLIST, defaultWatchFundList } from "./const";
import fetch from "node-fetch";
import { FundData } from "../types";
import { getCache, getInfoByStr, getMdByRegex, isCloseTime, setCache } from "./utils";
import { Toast, showToast } from "@raycast/api";

// TODO: 提供刷新按钮
export const getFundList = () => {
  const api = `${API_FUND_DETAIL}${defaultWatchFundList.map(item=>item.code).join(',')}`
  return fetch(api).then(item=> item.json()) as Promise<{data: FundData[]}>
}

export const getFundListWithCache = async () => {
  // 判断缓存
  const cacheFundList = getCache(CACHE_KEY_FUNDLIST) || []
  if(cacheFundList.length) {
    // 当天下午3点到晚8点 取缓存 不调接口(晚8点后净值更新) 
    if(isCloseTime(cacheFundList[0].detail.expectWorthDate)) {
      showToast({
        title: "来源缓存",
        message: "晚8点后更新净值",
      });
      return cacheFundList
    }
  }
  try {
    const {data} = await getFundList()
    // 根据估值排序
    data.sort((a, b) => +a.expectGrowth - (+b.expectGrowth));
    const list = data.map(item => ({code: item.code, detail: item}))
    setCache(CACHE_KEY_FUNDLIST, list)
    return list
  } catch (error) {
    console.log(error)
    showToast({
      style: Toast.Style.Failure,
      title: '接口加载失败',
    })
    return []
  }
}

// const api = "http://new.xianbao.fun/douban-maizu/2352196.html";
export const getHtmlStr = (url: string) =>{
  return fetch(url).then((resp) => {
    return resp.text();
  });
}


export const getZoyeList = async () => {
  const url = 'http://new.xianbao.fun/category-douban-maizu/'
  const htmlStr = await getHtmlStr(url)
  const regex = /<ul class="new-post">.*?<\/ul>/g;
  const md = getMdByRegex(htmlStr, regex)
  const list = md.split('\n')
  const res = list.map(item => getInfoByStr(item))
  return res
}

export const getZoyeListWithCache = async () => {
  // TODO: 判断缓存
  try {
    const list = await getZoyeList()
    return list
  } catch (error) {
    console.log(error)
    showToast({
      style: Toast.Style.Failure,
      title: '接口加载失败',
    })
    return []
  }
}

// const getFundListOneByOne = () => {
  // try {
  //   for (let i = 0; i < list.length; i++) {
  //     const { code } = list[i];
  //     const fundRes = await fetch(`${API_FUND_DETAIL}${code}`).then((item) => item.json());
  //     const { data } = fundRes as { data: FundData };
  //     const res = list.map((item) => {
  //       if (item.code === data.code) {
  //         item.detail = data;
  //       }
  //       return item;
  //     });
  //     setFundList(res);
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
// }