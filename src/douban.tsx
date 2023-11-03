import { Action, ActionPanel, Clipboard, List, Toast, open, showToast } from "@raycast/api";
import { useState } from "react";
import { getZoyeListWithCache } from "./common/request";
import ZoyeDetail from "./ZoyeDetail";
import SearchDropdown from "./components/SearchDropdown";
import { XIANBAO_HOST, channelList } from "./common/const";
import { getIconUrl } from "./common/utils";
import type { ZoYeItem } from "./common/utils";

export default function Command() {
  const [list, setList] = useState<ZoYeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChannelChange = async (channel: string) => {
    setIsLoading(true);
    const list = await getZoyeListWithCache(channel);
    // TODO: 星标商品 置顶并标红
    setList(list);
    setIsLoading(false);
  };

  const onCopy = (text) => {
    if (!text) {
      return showToast({
        title: "复制失败",
        style: Toast.Style.Failure,
      });
    }
    Clipboard.copy(text);
    showToast({
      title: "复制成功",
    });
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
              <Action title="Open DLink" shortcut={{ modifiers: ["cmd"], key: "o" }} onAction={() => open(`${XIANBAO_HOST}${item.path}`)} />
              <Action
                title="Copy List"
                shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                onAction={() =>
                  onCopy(
                    list.map(({ title, path }, index) => `${index + 1}. ${title}: ${XIANBAO_HOST}${path}`).join("\n\n")
                  )
                }
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
