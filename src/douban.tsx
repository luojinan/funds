import { Action, ActionPanel, List } from "@raycast/api";
import { useState } from "react";
import { getZoyeListWithCache } from "./common/request";
import ZoyeDetail from "./ZoyeDetail";
import SearchDropdown from "./components/SearchDropdown";
import { channelList } from "./common/const";
import { getIconUrl } from "./common/utils";
import type { ZoYeItem } from "./common/utils";

export default function Command() {
  const [list, setList] = useState<ZoYeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChannelChange = async (channel: string) => {
    const list = await getZoyeListWithCache(channel);
    // TODO: 星标商品 置顶并标红
    setList(list);
    setIsLoading(false);
  };

  return (
    <List
      isLoading={isLoading}
      searchBarAccessory={<SearchDropdown title="渠道" optionList={channelList} onChange={onChannelChange} />}
    >
      {list.map((item, index) => (
        <List.Item
          key={index}
          title={item.title || ""}
          subtitle={item?.time}
          icon={getIconUrl(item?.path)}
          actions={
            <ActionPanel>
              <Action.Push title="Detail Info" target={<ZoyeDetail path={item.path} title={item.title} />} />
              {/* TODO: 复制列表 */}
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
