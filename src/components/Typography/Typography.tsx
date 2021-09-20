import React, { ReactNode } from "react";

export type TypographyVariant =
  | `h${1 | 2 | 3 | 4 | 5 | 6}`
  | `button${1 | 2 | 3}`
  | `input${1 | 2 | 3}`
  | `body${1 | 2}`
  | "caption";

function getComponentFromVariant(
  variant: TypographyVariant
): TypographyComponent {
  if (variant.startsWith("h")) {
    return variant as TypographyComponent;
  }

  if (variant.startsWith("body")) {
    return "p";
  }

  return "span";
}

export const TypographyAlign = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export type TypographyAlignType = keyof typeof TypographyAlign;

export const TypographyColor = {
  primary: "text-primary-500",
  secondary: "text-secondary-500",
  success: "text-success-500",
  error: "text-error-500",
  warning: "text-warning-500",
  black: "text-black-500",
  gray: "text-gray-500",
};

export type TypographyColorType = keyof typeof TypographyColor;

export type TypographyComponent =
  | `h${1 | 2 | 3 | 4 | 5 | 6}`
  | "p"
  | "span"
  | "label"
  | "div"
  | "caption";

export interface TypographyProps {
  align?: TypographyAlignType;
  children: ReactNode;
  className?: string;
  color?: TypographyColorType;
  ellipsis?: boolean;
  noWrap?: boolean;
  variant?: TypographyVariant;
}

/**
 * 統合文字各種情境的元件
 * [Source Code](https://github.com/Parkerhiphop/ithelp-ui-demo/blob/main/src/components/Typography/Typography.tsx)
 */
export const Typography: React.FC<TypographyProps> = (props) => {
  const {
    align = "left",
    children,
    className,
    color = "black",
    ellipsis = false,
    noWrap = false,
    variant = "body1",
  } = props;

  const Component = getComponentFromVariant(variant) as any;

  return (
    <Component
      className={`${color ? TypographyColor[color] : ""} ${
        align ? TypographyAlign[align] : ""
      } ${ellipsis ? "overflow-ellipsis overflow-hidden" : ""} ${
        noWrap ? "whitespace-nowrap" : ""
      } ${className ? className : ""}`}
    >
      {children}
    </Component>
  );
};
