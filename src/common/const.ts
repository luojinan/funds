import { OptionListType } from "../components/SearchDropdown";

export const defaultWatchFundList = [
  { code: "004424", buyinWorth: 1.9262, watchWorth: "" },
  { code: "000968", buyinWorth: 0.9195, watchWorth: "" },
  { code: "003765", buyinWorth: 1.1535, watchWorth: "" },
  { code: "011612", buyinWorth: 0.7017, watchWorth: "" },
  { code: "004752", buyinWorth: 0.8289, watchWorth: "" },
  { code: "000478", buyinWorth: 2.6115, watchWorth: "" },
  { code: "001180", buyinWorth: 0.8707, watchWorth: "" },
  { code: "519915", buyinWorth: 2.352, watchWorth: "" },
  { code: "340001", buyinWorth: 1.021, watchWorth: "" },
  { code: "000071", buyinWorth: 1.0312, watchWorth: "" },
  { code: "014424", buyinWorth: 0.6792, watchWorth: "" },
  { code: "012348", buyinWorth: 0.4858, watchWorth: "" },
  { code: "001052", buyinWorth: 0.5987, watchWorth: "" },
  
]; // TODO: 表单输入，及json修改

// 获取当前日期并格式化
function getCurrentFormattedDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
const currentDate = getCurrentFormattedDate(); // Output "2023-01-23"

// 接口来源文档: https://www.doctorxiong.club/api/
const HOST = "https://api.doctorxiong.club/v1";

export const API_FUND_DETAIL = `${HOST}/fund/detail/list?startDate=${currentDate}&code=`;

// export const API_FUND_LIST = `${HOST}/fund/detailfund/detail?code=`

export const CACHE_KEY_FUNDLIST = "fund-list";

export const XIANBAO_HOST = "http://new.xianbao.fun";

export const NOT_NEED_LIST = [
  "精油",
  "精华",
  "香水",
  "车走",
  "面霜",
  "身体乳",
  "申删",
  "母婴",
  "隔离",
  "美瞳",
  "【删】",
  "月抛",
  "腮红",
  "🚗走",
];

export const channelList: OptionListType[] = [
  { id: "douban-maizu", name: "豆瓣买组" },
  { id: "douban-maolife", name: "豆瓣爱猫生活" },
  { id: "douban", name: "豆瓣" },
  { id: "all", name: "所有" },
];

export const ICON_MAP = new Map([
  ["kuan", "202311011533694"],
  ["weibo", "202311011534678"],
  ["zuankeba", "202311011534777"],
  ["xiaodigu", "202311011541249"],
  ["xinzuanba", "202311011534044"],
  ["douban-maizu", "202311011529755"],
  ["douban-maolife", "202311011535797"],
  ["douban-pinzu", "202311011533345"],
  ["douban-fazu", "202311011537275"],
  ["douban-gouzu", "202311011537007"],
  ["douban-maobathtub", "202311011535797"],
]);

export const CACHE_KEY_ZAI = "zai-history-list";
export const CACHE_KEY_SSO_CODE = "zz-sso-code";

export const AI_HOST = "https://chatgpt1.zhuanspirit.com/api/chat-process";

export const Japanese50yin = `|あ|い|う|え|お|
|---|---|---|---|---|
|あア [a]|いイ [i]|うウ [u]|えエ [e]|おオ [o]|
|かカ [ka]|き [ki] |くク [ku]|けケ [ke]|こコ [ko] |
|さサ [sa] |しシ [ʃi] |すス [su]|せセ [se]|そソ [so]|
|たタ [ta] |ちチ [tʃi]|つツ [tsu]|てテ [te] |とト [to]|
|なナ [na] |にニ [ɲi] |ぬヌ [nu]|ねネ [ne] |のノ [no]|
|はハ [ha] |ひヒ [hi]|ふフ [fu]|へヘ [he] |ほホ [ho] |
|まマ [ma] |みミ [mʲi]|むム [mu] |め [me]|もモ [mo]|
|やヤ [ya]|  |ゆユ [yu]|  |よヨ [yo]|
|らラ [ra]|りリ [rʲi] |るル [ru] |れレ [re]|ろロ [ro]|
|わワ [wa]|  |  |  |をヲ [wo]|
`

const a = {
  "ka": [
    { "hiragana": "か", "katakana": "カ", "romaji": "ka", "meaning": "蚊 - 蚊" },
    { "hiragana": "かさ", "katakana": "カサ", "romaji": "kasa", "meaning": "傘 - 伞" },
    { "hiragana": "かわ", "katakana": "カワ", "romaji": "kawa", "meaning": "川 - 河流" },
    { "hiragana": "かぎ", "katakana": "カギ", "romaji": "kagi", "meaning": "鍵 - 钥匙" },
    { "hiragana": "かた", "katakana": "カタ", "romaji": "kata", "meaning": "肩 - 肩膀" }
  ],
  "ku": [
    { "hiragana": "く", "katakana": "ク", "romaji": "ku", "meaning": "空 - 天空" },
    { "hiragana": "くつ", "katakana": "クツ", "romaji": "kutsu", "meaning": "靴 - 鞋子" },
    { "hiragana": "くるま", "katakana": "クルマ", "romaji": "kuruma", "meaning": "車 - 汽车" },
    { "hiragana": "くち", "katakana": "クチ", "romaji": "kuchi", "meaning": "口 - 嘴巴" },
    { "hiragana": "くすり", "katakana": "クスリ", "romaji": "kusuri", "meaning": "薬 - 药" }
  ],
  "ke": [
    { "hiragana": "け", "katakana": "ケ", "romaji": "ke", "meaning": "毛 - 毛发" },
    { "hiragana": "けいたい", "katakana": "ケイタイ", "romaji": "keitai", "meaning": "携帯 - 手机" },
    { "hiragana": "けさ", "katakana": "ケサ", "romaji": "kesa", "meaning": "今朝 - 今天早上" },
    { "hiragana": "けいさん", "katakana": "ケイサン", "romaji": "keisan", "meaning": "計算 - 计算" },
    { "hiragana": "けんきゅう", "katakana": "ケンキュウ", "romaji": "kenkyuu", "meaning": "研究 - 研究" }
  ]
}