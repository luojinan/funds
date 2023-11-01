import { List } from "@raycast/api";

export type OptionListType = { id: string; name: string };

interface SearchDropdownProp {
  optionList: OptionListType[]
  onChange: (newValue: string) => void
  title: string
}

function SearchDropdown(props: SearchDropdownProp) {
  const { optionList, onChange, title } = props;
  return (
    <List.Dropdown
      tooltip="Select Drink Type"
      onChange={(newValue) => {
        onChange(newValue);
      }}
    >
      <List.Dropdown.Section title={title}>
        {optionList.map((optionItem) => (
          <List.Dropdown.Item key={optionItem.id} title={optionItem.name} value={optionItem.id} />
        ))}
      </List.Dropdown.Section>
    </List.Dropdown>
  );
}

export default SearchDropdown