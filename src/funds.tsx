import { Action, ActionPanel, Color, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { defaultWatchFundList } from "./common/const";
import FundDetail from "./FundDetail";
import { FundData } from "./types";
import { getFundListWithCache } from "./common/request";
import { getUpDownPercent, isDown } from "./common/utils";

interface FundItem {
  code: string;
  detail: FundData | null;
}

const initList: FundItem[] = defaultWatchFundList.map((item) => ({ code: item.code, detail: null }));

export default function Command() {
  const [fundList, setFundList] = useState(initList);
  const [isLoading, setIsLoading] = useState(true);

  const getTagList = (fundItem: FundItem) => {
    if (!fundItem.detail) return [];
    const tagKeys = ["dayGrowth", "expectGrowth"] as const;
    const tagList = tagKeys.map((key) => ({
      tag: {
        value: `${key === "expectGrowth" ? "估" : ""}${fundItem.detail?.[key]}%`,
        color: isDown(fundItem.detail?.[key]) ? Color.Green : Color.Red,
      },
    }));
    const hasButInWorthItem = defaultWatchFundList.find((item) => fundItem.code === item.code && !!item.buyinWorth);
    if (hasButInWorthItem) {
      const res = getUpDownPercent({ newWorth: fundItem.detail.expectWorth, oldWorth: hasButInWorthItem.buyinWorth });
      tagList.push({
        tag: {
          value: `${res}%`,
          color: isDown(res) ? Color.Green : Color.Red,
        },
      });
    }
    return tagList;
  };

  useEffect(() => {
    (async () => {
      const list = await getFundListWithCache();
      setFundList(list);
      setIsLoading(false);
    })();
  }, []);

  return (
    <List isLoading={isLoading}>
      {fundList.map((fundItem, index) => (
        <List.Item
          key={index}
          title={fundItem.detail?.name || ""}
          // 1.昨日净值涨幅 2.今日估值涨幅 3.买入后涨幅(使用估值计算)
          accessories={getTagList(fundItem)}
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
