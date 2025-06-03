import React from "react";
import { FormField as Field } from "../types/form";
import {
  Input,
  TextArea,
  Checkbox,
  RadioGroup,
  RadioLabel,
} from "../styles/SharedStyles";

export default function FormField({ field }: { field: Field }) {
  switch (field.type) {
    case "numeric":
      return <Input type="number" name={field.name} />;
    case "string":
      return <Input type="text" name={field.name} />;
    case "multi-line":
      return <TextArea name={field.name} />;
    case "boolean":
      return <Checkbox type="checkbox" name={field.name} />;
    case "date":
      return <Input type="date" name={field.name} />;
    case "enum":
      return (
        <RadioGroup>
          {field.options?.map((option) => (
            <RadioLabel key={option}>
              <input type="radio" name={field.name} value={option} /> {option}
            </RadioLabel>
          ))}
        </RadioGroup>
      );
    default:
      return null;
  }
}
