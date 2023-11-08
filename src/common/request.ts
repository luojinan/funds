import {
  AI_HOST,
  API_FUND_DETAIL,
  CACHE_KEY_FUNDLIST,
  NOT_NEED_LIST,
  XIANBAO_HOST,
  defaultWatchFundList,
} from "./const";
import fetch from "node-fetch";
import { FundData } from "../types";
import { getCache, getInfoByStr, getMdByRegex, isCloseTime, setCache } from "./utils";
import type { ZoYeItem } from "./utils";
import { Toast, showToast } from "@raycast/api";

// TODO: 提供刷新按钮
export const getFundList = () => {
  const api = `${API_FUND_DETAIL}${defaultWatchFundList.map((item) => item.code).join(",")}`;
  return fetch(api).then((item) => item.json()) as Promise<{ data: FundData[] }>;
};

export const getFundListWithCache = async () => {
  // 判断缓存
  const cacheFundList = getCache(CACHE_KEY_FUNDLIST) || [];
  if (cacheFundList.length) {
    // 当天下午3点到晚8点 取缓存 不调接口(晚8点后净值更新)
    if (isCloseTime(cacheFundList[0].detail.expectWorthDate)) {
      showToast({
        title: "来源缓存",
        message: "晚8点后更新净值",
      });
      return cacheFundList;
    }
  }
  try {
    const { data } = await getFundList();
    // 根据估值排序
    data.sort((a, b) => +a.expectGrowth - +b.expectGrowth);
    const list = data.map((item) => ({ code: item.code, detail: item }));
    setCache(CACHE_KEY_FUNDLIST, list);
    return list;
  } catch (error) {
    console.log(error);
    showToast({
      style: Toast.Style.Failure,
      title: "接口加载失败",
    });
    return [];
  }
};

export const getHtmlStr = (url: string) => {
  return fetch(url).then((resp) => {
    return resp.text();
  });
};

export const getZoyeList = async (channel: string): Promise<ZoYeItem[]> => {
  let url = XIANBAO_HOST;
  if (channel !== "all") {
    url = `${url}/category-${channel}/`;
  }
  const htmlStr = await getHtmlStr(url);
  if(!htmlStr) {
    console.log('获取html失败')
  }
  const regex = /<ul class="new-post">([\s\S]*)<\/ul>/g;
  const md = getMdByRegex(htmlStr, regex);
  const list = md.split("\n");
  const res: ZoYeItem[] = [];
  list.forEach((item) => {
    const resItem = getInfoByStr(item);
    if (resItem.title && !NOT_NEED_LIST.some((noneed) => resItem.title.includes(noneed))) {
      res.push(resItem);
    }
  });
  return res;
};

export const getZoyeListWithCache = async (channel: string) => {
  // TODO: 判断缓存
  try {
    const list = await getZoyeList(channel);
    return list;
  } catch (error) {
    console.log(error);
    showToast({
      style: Toast.Style.Failure,
      title: "接口加载失败",
    });
    return [];
  }
};

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

export const promptAI = async (prompt: string, { callback, done }: { callback: (any) => void; done?: () => void }) => {
  const response = await fetch(AI_HOST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie:
        "sso_uid=608863335; sso_code=5ec6905069c06eda2996c6772beb18e2; sso_company_code=0; kid=1630422302413820929",
    },
    body: JSON.stringify({
      options: { parentMessageId: "chatcmpl-8GMcVvSSCXxIyxNLukW91mDcorSiG" },
      prompt,
    }),
  });
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  if (response.body) {
    for await (const chunk of response.body) {
      if (chunk) {
        const str = new TextDecoder().decode(chunk as ArrayBuffer);
        try {
          const res = JSON.parse(`${str}`);
          callback(res);
          if (res.detail.choices[0].finish_reason === "stop") {
            console.log("回答结束");
            done && done();
          }
        } catch (error) {
          console.log(str);
        }
      }
    }
  }
};
