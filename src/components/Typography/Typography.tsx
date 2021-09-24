import React, { ReactNode } from "react";
import { Color, ColorType } from "../../system/typings";

export type TypographyVariantType =
  | `h${1 | 2 | 3 | 4 | 5 | 6}`
  | `button${1 | 2 | 3}`
  | `input${1 | 2 | 3}`
  | `body${1 | 2}`
  | "caption";

export const TypographyVariant = {
  body1: "text-base	font-normal	tracking-normal	leading-6",
  body2: "text-sm font-normal	tracking-normal leading-5	",
  button1: "text-base font-medium	tracking-wide	leading-10	",
  button2: "text-base	font-medium	tracking-wide	leading-8	",
  button3: "text-sm font-medium	tracking-normal leading-6	",
  input1: "text-base font-normal tracking-normal leading-10",
  input2: "text-base font-normal tracking-normal leading-8	",
  input3: "text-base font-normal tracking-normal leading-6	",
};

export type TypographyComponent =
  | `h${1 | 2 | 3 | 4 | 5 | 6}`
  | "p"
  | "span"
  | "label"
  | "div"
  | "caption";

function getComponentFromVariant(
  variant: TypographyVariantType
): TypographyComponent {
  if (variant.startsWith("caption")) {
    return "caption";
  }

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

export interface TypographyProps {
  align?: TypographyAlignType;
  children: ReactNode;
  className?: string;
  color?: ColorType;
  ellipsis?: boolean;
  noWrap?: boolean;
  variant?: TypographyVariantType;
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
      className={`
      ${color ? Color[color] : ""}
      ${align ? TypographyAlign[align] : ""}
      ${ellipsis ? "overflow-ellipsis overflow-hidden" : ""}
      ${noWrap ? "whitespace-nowrap" : ""}
      ${variant ? TypographyVariant[variant] : ""}
      ${className ? className : ""}
      `}
    >
      {children}
    </Component>
  );
};
