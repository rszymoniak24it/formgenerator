import { TabButton } from "../styles/SharedStyles";

interface Props {
  activeTab: string;
  onChange: (tab: string) => void;
}

export default function TabSwitcher({ activeTab, onChange }: Props) {
  return (
    <div>
      <TabButton
        onClick={() => onChange("config")}
        $active={activeTab === "config"}
      >
        Config
      </TabButton>
      <TabButton
        onClick={() => onChange("result")}
        $active={activeTab === "result"}
      >
        Result
      </TabButton>
    </div>
  );
}