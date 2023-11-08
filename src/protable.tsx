import { Action, ActionPanel, List } from "@raycast/api";
import { useState } from "react";
import { ActionCopy } from "./components/ActionCopy";

interface ItemType {
  title: string
  md: string
}

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState<ItemType[]>([]);

  const getRes = (keyListStr: string): ItemType => {
    const keylist = keyListStr.split('、')
    const res = keylist.map((item, index)=>{
      return `{
  title: '${item}',
  dataIndex: 'key${index+1}',
  hideInSearch: true
},`
    })
    return {
      title: searchText,
      md: res.join('\n')
    }
  }

  const getAnswer = async () => {
    const res = getRes(searchText)
    setList([res, ...list])
  };

  return (
    <List
      isShowingDetail
      onSearchTextChange={setSearchText}
      actions={
        <ActionPanel>
          <Action title="Go" shortcut={{ modifiers: ["cmd"], key: "g" }} onAction={getAnswer} />
        </ActionPanel>
      }
    >
      {list.map((item, index) => {
        return (
          <List.Item
            key={index}
            title={item?.title || ""}
            detail={<List.Item.Detail markdown={`\`\`\`\n${item.md}\n\`\`\``} />}
            actions={
              <ActionPanel>
                <Action title="Go" shortcut={{ modifiers: ["cmd"], key: "g" }} onAction={getAnswer} />
                <ActionCopy title="Copy Answer" content={item.md} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
