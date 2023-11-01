import { Action, ActionPanel, List } from "@raycast/api";
import { useState } from "react";
import { getZoyeListWithCache } from "./common/request";
import ZoyeDetail from "./zoyeDetail";
import SearchDropdown from "./components/SearchDropdown";
import { channelList } from "./common/const";
import { getIconUrl } from "./common/utils";

interface ZoyeItem {
  path: string;
  title: string;
  time: string
}

export default function Command() {
  const [list, setList] = useState<ZoyeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChannelChange = async (channel: string) => {
    const list = await getZoyeListWithCache(channel)
    setList(list)
    setIsLoading(false)
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
          icon={getIconUrl(item.path)}
          actions={
            <ActionPanel>
              <Action.Push title="Detail Info" target={<ZoyeDetail path={item.path} title={item.title} />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
