interface FormInputProps {
  name: string;
  control: any;
  label: string;
  type?: string;
  setValue?: any;
  options?: any;
  error?: any;
}

interface FormTextFieldProps {
  name: string;
  control: any;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  size?: "small" | "medium";
}

interface FormRatingProps {
  name: string;
  control: any;
}
