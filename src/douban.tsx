import { Action, ActionPanel, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { getZoyeListWithCache } from "./common/request";
import ZoyeDetail from "./zoyeDetail";

interface ZoyeItem {
  path: string;
  title: string;
  time: string
}

export default function Command() {
  const [list, setList] = useState<ZoyeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const list = await getZoyeListWithCache()
      setList(list)
      setIsLoading(false)
    })();
  }, []);

  return (
    <List isLoading={isLoading}>
      {list.map((item, index) => (
        <List.Item
          key={index}
          title={item.title || ""}
          subtitle={item?.time}
          actions={
            <ActionPanel>
              <Action.Push title="Detail Info" target={<ZoyeDetail path={item.path} />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
