export const Color = {
  primary: "primary-500",
  secondary: "secondary-500",
  success: "success-500",
  error: "error-500",
  warning: "warning-500",
  black: "black-500",
  disabled: "gray-500",
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

export type Size = 'small' | 'medium' | 'large';

export type Orientation = 'horizontal' | 'vertical';

export type TransitionDurationType =
  | 'shortest'
  | 'shorter'
  | 'short'
  | 'standard'
  | 'long';

export const TRANSITION_DURATION: Readonly<Record<TransitionDurationType, number>> = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  long: 400,
};

export type TransitionEasingType =
  | 'standard'
  | 'emphasized'
  | 'decelerated'
  | 'accelerated';

export const TRANSITION_EASING: Readonly<Record<TransitionEasingType, string>> = {
  standard: 'cubic-bezier(0.58, 0.01, 0.29, 1.01)',
  emphasized: 'cubic-bezier(0.83, 0, 0.17, 1)',
  decelerated: 'cubic-bezier(0, 0, 0.3, 1)',
  accelerated: 'cubic-bezier(0.32, 0, 0.67, 0)',
};
