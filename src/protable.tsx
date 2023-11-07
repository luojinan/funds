import { Action, ActionPanel, Clipboard, List, Toast, showToast } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]);

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
      message: text,
    });
  };

  const getRes = (keyListStr: string) => {
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
            detail={<List.Item.Detail markdown={`\`\`\`json\n${item.md}\n\`\`\``} />}
            actions={
              <ActionPanel>
                <Action title="Go" shortcut={{ modifiers: ["cmd"], key: "g" }} onAction={getAnswer} />
                <Action title="Copy" shortcut={{ modifiers: ["cmd", "shift"], key: "c" }} onAction={()=>onCopy(item.md)} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
