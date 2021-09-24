export const Color = {
  primary: "text-primary-500",
  secondary: "text-secondary-500",
  success: "text-success-500",
  error: "text-error-500",
  warning: "text-warning-500",
  black: "text-black-500",
  disabled: "text-gray-500",
};

export type ColorType = keyof typeof Color;

export const colors: ColorType[] = [
  "primary",
  "secondary",
  "error",
  "warning",
  "success",
  "black",
  "disabled",
];
