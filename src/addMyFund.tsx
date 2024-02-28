import { Detail } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [article, setArticle] = useState("");
  return <Detail markdown={article} />;
}
