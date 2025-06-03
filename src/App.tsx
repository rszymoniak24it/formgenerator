import React, { useState } from "react";
import { FormConfig } from "./types/form";
import TabSwitcher from "./components/TabSwitcher";
import FormRenderer from "./components/FormRenderer";
import {
  Container,
  TabContent,
  TextArea,
  ErrorText,
  Button,
} from "./styles/SharedStyles";

export default function App() {
  const [jsonInput, setJsonInput] = useState<string>("{");
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("config");

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  const handleGenerateForm = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormConfig(parsed);
      setError(null);
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <Container>
      <TabSwitcher activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "config" && (
        <TabContent>
          <TextArea
            value={jsonInput}
            onChange={handleJsonChange}
            placeholder="Enter form configuration JSON here"
          />
          {error && <ErrorText>{error}</ErrorText>}
          <Button onClick={handleGenerateForm}>Generate Form</Button>
        </TabContent>
      )}

      {activeTab === "result" && (
        <TabContent>
          {formConfig ? (
            <FormRenderer config={formConfig} />
          ) : (
            <div>No form configuration loaded.</div>
          )}
        </TabContent>
      )}
    </Container>
  );
}