import { Action } from "@raycast/api";

export const ActionCopy = (props: Action.CopyToClipboard.Props) => (
  <Action.CopyToClipboard shortcut={{ modifiers: ["cmd", "shift"], key: "c" }} {...props} />
);