import { API_FUND_DETAIL, defaultWatchFundList } from "./const";
import fetch from "node-fetch";
import { FundData } from "../types";

export const getFundList = () => {
  const api = `${API_FUND_DETAIL}${defaultWatchFundList.join(',')}`
  return fetch(api).then(item=> item.json()) as Promise<{data: FundData[]}>
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