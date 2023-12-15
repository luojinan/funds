import { Action, ActionPanel, List, Toast, showToast } from "@raycast/api";
import { useEffect, useState } from "react";
import { getCache, setCache } from "./common/utils";
import { AI_HOST, CACHE_KEY_SSO_CODE, CACHE_KEY_ZAI } from "./common/const";
import { ActionCopy } from "./components/ActionCopy";
import fetch from "node-fetch";
import SearchDropdown from "./components/SearchDropdown";

interface AnswerType {
  prompt?: string;
  text?: string;
  role?: string;
  id?: string;
  detail?: any;
}

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<AnswerType[]>([]);
  const [showMode, setShowMode] = useState<string>("");
  const [ssoCode, setSsoCode] = useState<string>("")
  const [searchBarPlaceholder, setSearchBarPlaceholder] = useState<string>("请输入问题")


  const setCookie = () =>{
    setSsoCode(searchText)
    setCache(CACHE_KEY_SSO_CODE, searchText)
    setSearchText('')
    showToast({
      title: "ssoCode保存成功，请切换回chat模式",
      message: searchText,
    });
  }

  const getAnswer = async () => {
    if(showMode ==='setCookie'){
      setCookie()
      return
    }
    setLoading(true);
    try {
      const response = await fetch(AI_HOST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie:
            `sso_uid=608863335; sso_code=${ssoCode}; sso_company_code=0; kid=1630422302413820929`,
        },
        body: JSON.stringify({
          options: {
            parentMessageId: "ab4357c4-d483-4146-bbe8-6294c4369b57",
            conversationId: "chatcmpl-8O2TY939hFjTl7j1hVuSSBI9g7UzU"
          },
          prompt: searchText,
        }),
      }).then(response => response.json()).finally(() => setLoading(false));
      console.log(response?.data?.message)
      const newList = [ { prompt: searchText, text: response?.data?.message }, ...list]
      setList(newList)
      setCache(CACHE_KEY_ZAI, newList);
      setSearchText('')
    } catch (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "加载失败，请更新ssoCode后重试",
      });
    }
  };

  const onChangeSearchDropdown = (id: string) => {
    setShowMode(id)
    if(id ==='setCookie'){
      setSearchBarPlaceholder('请输入sso_code')
    }else{
      setSearchBarPlaceholder('请输入问题')
    }
  }

  useEffect(()=>{
    const list = getCache(CACHE_KEY_ZAI) || [];
    setList(list);
    const ssoCode = getCache(CACHE_KEY_SSO_CODE)
    setSsoCode(ssoCode)
    
  },[])

  // menu： 推荐以下表示`商务信息`、`商场特点`的变量名，并提供英英注释、例句和词组，这些都要求有对应的中文翻译，同时要求提供一些类似含义的同义词或相关词汇，以帮助我扩展我的英语词汇量

  return (
    <List
      isShowingDetail
      searchText={searchText}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder={searchBarPlaceholder}
      searchBarAccessory={<SearchDropdown title="渠道" optionList={[{id: 'chat', name: 'chat'},{id: 'setCookie', name: '设置cookie'}]} onChange={onChangeSearchDropdown} />}
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
            detail={<List.Item.Detail isLoading={loading} markdown={`> **${item.prompt}**\n\n${item.text?.replace(/```(js|javascript)/g, '```')}`} />}
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
