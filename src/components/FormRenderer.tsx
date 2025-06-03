import { useState } from "react";
import { FormField, Props } from "../types/form";
import {
  FormCard,
  Title,
  FormGroup,
  Label,
  Input,
  TextArea,
  Checkbox,
  ErrorText,
  RadioLabel,
  ButtonGroup,
  Button,
} from "../styles/SharedStyles";

export default function FormRenderer({ config }: Props) {
  const [values, setValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const actionHandlers: Record<string, () => void> = {
    handleSubmit: () => {
      const newErrors: { [key: string]: string } = {};

      config.fields.forEach((field) => {
        const error = validateField(field, values[field.name]);
        if (error) {
          newErrors[field.name] = error;
        }
      });

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert("Form submitted successfully!");
        console.log("Submitted values:", values);
      }
    },
    handleReset: () => {
      const resetValues: Record<string, any> = {};
      config.fields.forEach((field) => {
        resetValues[field.name] = null;
      });
      setValues(resetValues);
      setErrors({});
    },
  };

  const handleButtonClick = (actionName: string) => {
    if (actionHandlers[actionName]) {
      actionHandlers[actionName]();
    } else {
      console.warn(`No handler defined for action: ${actionName}`);
    }
  };

  const validateField = (field: FormField, value: any): string | null => {
    const rules = field.validation;
    if (!rules) return null;

    if (rules.required && (value === undefined || value === "" || value === false)) {
      return "This field is required.";
    }
    if (rules.min !== undefined && value < rules.min) {
      return `Minimum value is ${rules.min}`;
    }
    if (rules.max !== undefined && value > rules.max) {
      return `Maximum value is ${rules.max}`;
    }
    if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
      return "Invalid format.";
    }
    return null;
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      name: field.name,
      id: field.name,
      value: values[field.name] ?? "",
      onChange: (e: any) =>
        handleChange(field.name, field.type === "boolean" ? e.target.checked : e.target.value),
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
            checked={values[field.name] || false}
            onChange={commonProps.onChange}
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
                  checked={values[field.name] === option}
                  onChange={commonProps.onChange}
                />
                {option}
              </RadioLabel>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <FormCard>
      <Title>{config.title}</Title>
      <form onSubmit={(e) => e.preventDefault()}>
        {config.fields.map((field) => (
          <FormGroup key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            {renderField(field)}
            {errors[field.name] && <ErrorText>{errors[field.name]}</ErrorText>}
          </FormGroup>
        ))}
        <ButtonGroup>
          {config.buttons.map((btn, idx) => (
            <Button key={idx} type="button" onClick={() => handleButtonClick(btn.action)}>
              {btn.label}
            </Button>
          ))}
        </ButtonGroup>
      </form>
    </FormCard>
  );
}