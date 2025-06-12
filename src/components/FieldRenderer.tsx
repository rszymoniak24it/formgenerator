import React from "react";
import { FormField } from "../types/form";
import { Input, TextArea, Checkbox, RadioLabel } from "../styles/SharedStyles";

type Props = {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
};

const FieldRenderer = React.memo(({ field, value, onChange }: Props) => {
  const commonProps = {
    id: field.name,
    name: field.name,
    value: value ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (field.type === "boolean") {
        const target = e.currentTarget as HTMLInputElement;
        onChange(target.checked);
      } else {
        onChange(e.currentTarget.value);
      }
  }
  };

  switch (field.type) {
    case "numeric":
      return <Input type="number" {...commonProps} />;
    case "string":
      return <Input type="text" {...commonProps} />;
    case "multi-line":
      return <TextArea {...commonProps} />;
    case "boolean":
      return (
        <Checkbox
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(e.currentTarget.checked)}
        />
      );
    case "date":
      return <Input type="date" {...commonProps} />;
    case "enum":
      return (
        <>
          {field.options?.map((option) => (
            <RadioLabel key={option}>
              <input
                type="radio"
                name={field.name}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
              />
              {option}
            </RadioLabel>
          ))}
        </>
      );
    default:
      return null;
  }
});

export default FieldRenderer;