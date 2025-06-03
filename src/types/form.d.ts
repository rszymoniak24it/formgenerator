export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: "numeric" | "string" | "multi-line" | "boolean" | "date" | "enum";
  options?: string[];
  validation?: ValidationRules;
}

export interface FormButton {
  label: string;
  action: string;
}

export interface FormConfig {
  title: string;
  fields: FormField[];
  buttons: FormButton[];
}

export interface Props {
  config: FormConfig;
}