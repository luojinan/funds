import { Action, ActionPanel, Color, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { defaultWatchFundList } from "./common/const";
import FundDetail from "./FundDetail";
import { FundData } from "./types";
import { getFundListWithCache } from "./common/request";

interface FundItem {
  code: string;
  detail: FundData | null;
}

const list: FundItem[] = defaultWatchFundList.map((code) => ({ code, detail: null }));

export default function Command() {
  const [fundList, setFundList] = useState(list);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const list = await getFundListWithCache()
      setFundList(list)
      setIsLoading(false)
    })();
  }, []);

  const isUp = (value: string) => value.startsWith("-");

  return (
    <List isLoading={isLoading}>
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
