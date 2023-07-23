import { Detail } from "@raycast/api";
import { FundData } from "./types";

interface Props {
  fundData: FundData
}

export default function FundDetail({fundData}: Props) {
  console.log(fundData)
  return <Detail markdown="Pong" />;
}