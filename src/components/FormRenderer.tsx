import { useReducer, useCallback } from "react";
import { FormField, Props } from "../types/form";
import {
  FormCard,
  Title,
  FormGroup,
  Label,
  ErrorText,
  ButtonGroup,
  Button,
} from "../styles/SharedStyles";
import FieldRenderer from "./FieldRenderer"; // We'll create this next

type FormState = {
  values: { [key: string]: any };
  errors: { [key: string]: string };
};

function formReducer(state: FormState, action: any): FormState {
  switch (action.type) {
    case "CHANGE_VALUE":
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET":
      const resetValues = Object.keys(state.values).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {} as Record<string, any>);
      return { values: resetValues, errors: {} };
    default:
      return state;
  }
}

export default function FormRenderer({ config }: Props) {
  const initialState: FormState = {
    values: config.fields.reduce((acc, field) => {
      acc[field.name] = null;
      return acc;
    }, {} as Record<string, any>),
    errors: {},
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const validateField = useCallback((field: FormField, value: any): string | null => {
    const rules = field.validation;
    if (!rules) return null;
    if (rules.required && (value === null || value === "" || value === false)) {
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
  }, []);

  const handleChange = useCallback((name: string, value: any) => {
    dispatch({ type: "CHANGE_VALUE", name, value });
  }, []);

  const handleButtonClick = (actionName: string) => {
    if (actionName === "handleSubmit") {
      const newErrors: Record<string, string> = {};
      config.fields.forEach((field) => {
        const error = validateField(field, state.values[field.name]);
        if (error) newErrors[field.name] = error;
      });
      dispatch({ type: "SET_ERRORS", errors: newErrors });

      if (Object.keys(newErrors).length === 0) {
        alert("Form submitted successfully!");
        console.log("Submitted values:", state.values);
      }
    } else if (actionName === "handleReset") {
      dispatch({ type: "RESET" });
    } else {
      console.warn(`No handler defined for action: ${actionName}`);
    }
  };

  return (
    <FormCard>
      <Title>{config.title}</Title>
      <form onSubmit={(e) => e.preventDefault()}>
        {config.fields.map((field) => (
          <FormGroup key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <FieldRenderer
              field={field}
              value={state.values[field.name]}
              onChange={(val) => handleChange(field.name, val)}
            />
            {state.errors[field.name] && <ErrorText>{state.errors[field.name]}</ErrorText>}
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