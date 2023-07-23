import { Action, ActionPanel, Color, Detail, List } from "@raycast/api";
import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { API_FUND_DETAIL, defaultWatchFundList } from "./common/const";
import FundDetail from "./FundDetail";
import { FundData } from "./types";

interface FundItem {
  code: string;
  detail: FundData | null;
}


export default function Command() {
  const [fundList, setFundList] = useState<FundItem[]>([]);

  useEffect(() => {
    (async () => {
      const list: FundItem[] = defaultWatchFundList.map((code) => ({ code, detail: null }));
      setFundList(list);
      try {
        for (let i = 0; i < list.length; i++) {
          const { code } = list[i];
          const fundRes = await fetch(`${API_FUND_DETAIL}${code}`).then((item) => item.json());
          const { data } = fundRes as { data: FundData };
          const res = list.map((item) => {
            if (item.code === data.code) {
              item.detail = data;
            }
            return item;
          });
          setFundList(res);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const isUp = (value: string) => value.startsWith("-");

  // TODO: 排序
  return (
    <List>
      {fundList.map((fundItem, index) => (
        <List.Item
          key={index}
          title={fundItem.detail?.name || ""}
          // 1.昨日净值涨幅 2.今日估值涨幅
          accessories={
            fundItem.detail
              ? [
                  {
                    tag: {
                      value: `${fundItem.detail.dayGrowth}%`,
                      color: isUp(fundItem.detail.dayGrowth) ? Color.Green : Color.Red,
                    },
                  },
                  {
                    tag: {
                      value: `估:${fundItem.detail.expectGrowth}%`,
                      color: isUp(fundItem.detail.expectGrowth) ? Color.Green : Color.Red,
                    },
                  },
                ]
              : []
          }
          subtitle={fundItem.code}
          actions={
            <ActionPanel>
              <Action.Push title="Detail Info" target={<FundDetail fundData={fundItem.detail} />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
