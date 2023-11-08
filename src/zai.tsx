import { Action, ActionPanel, List } from "@raycast/api";
import { useEffect, useReducer, useState } from "react";
import { promptAI } from "./common/request";
import { getCache, setCache } from "./common/utils";
import { CACHE_KEY_ZAI } from "./common/const";
import { ActionCopy } from "./components/ActionCopy";

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
    setList({ type: "add", res: { prompt: searchText, text: "思考中" } });
    promptAI(searchText, {
      callback: (answer) => {
        setList({ type: "update", res: answer });
      },
    });
  };

  useEffect(() => {
    const [answer]  = list;
    if (answer?.detail?.choices[0]?.finish_reason === "stop") {
      setCache(CACHE_KEY_ZAI, list);
    }
  }, [list]);

  // menu： 推荐以下表示`商务信息`、`商场特点`的变量名，并提供英英注释、例句和词组，这些都要求有对应的中文翻译，同时要求提供一些类似含义的同义词或相关词汇，以帮助我扩展我的英语词汇量

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
            // 🤔 CommonMark render code with js/jsx/ts/tsx will change `'` to `&#x27;`
            // 🤯 why other developer ignore this issue , thy can fixed it ? by what?
            detail={<List.Item.Detail markdown={`> **${item.prompt}**\n\n${item.text?.replace(/```(js|javascript)/g, '```')}`} />}
            actions={
              <ActionPanel>
                <Action title="Get Answer" shortcut={{ modifiers: ["cmd"], key: "g" }} onAction={getAnswer} />
                <ActionCopy title="Copy Answer" content={item.text || ''} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
