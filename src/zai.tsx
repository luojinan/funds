import { Action, ActionPanel, List } from "@raycast/api";
import { useEffect, useReducer, useState } from "react";
import { promptAI } from "./common/request";
import { getCache, setCache } from "./common/utils";
import { CACHE_KEY_ZAI } from "./common/const";

interface AnswerType {
  prompt?: string;
  text?: string;
  role?: string;
  id?: string;
  detail?: any;
}

const reducer = (state: AnswerType[], action: { type: "add" | "update"; res: AnswerType }): AnswerType[] => {
  switch (action.type) {
    case "add":
      return [action.res, ...state];
    case "update":
      return state.map((item, index) => {
        if (index === 0) {
          return { ...item, ...action.res };
        }
        return item;
      });
    default:
      return state;
  }
};

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useReducer(reducer, getCache(CACHE_KEY_ZAI) || []);

  const getAnswer = async () => {
    // list.unshift()
    setList({ type: "add", res: { prompt: searchText, text: "思考中" } });
    promptAI(searchText, {
      callback: (answer) => {
        setList({ type: "update", res: answer });
      },
    });
  };

  useEffect(() => {
    const [answer] = list;
    if (answer?.detail?.choices[0]?.finish_reason === "stop") {
      setCache(CACHE_KEY_ZAI, list);
    }
  }, [list]);

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
            title={item?.prompt || ""}
            detail={<List.Item.Detail markdown={item.text} />}
            actions={
              <ActionPanel>
                <Action title="Go" shortcut={{ modifiers: ["cmd"], key: "g" }} onAction={getAnswer} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
