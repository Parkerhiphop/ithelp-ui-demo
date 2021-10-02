import React from "react";
import { Color, ColorType } from "../../system/typings";

export interface IconDefinition {
  name: string;
  definition: {
    svg?: {
      viewBox?: string;
    };
    path?: {
      d?: string;
      fill?: string;
      fillRule?: "nonzero" | "evenodd" | "inherit";
      stroke?: string;
      strokeWidth?: string | number;
      transform?: string;
    };
  };
}

export interface IconProps extends React.ComponentPropsWithRef<'i'> {
  className?: string;
  /**
   * Color name provided by palette.
   */
  color?: ColorType;
  /**
   * The icon provided by `@mezzanine-ui/icons` package.
   */
  icon: IconDefinition;
  /**
   * Whether to spin the icon or not.
   * @default false
   */
  spin?: boolean;
}

/**
 * 可套用 IconDefinition 來 Render 對應 Icon 的元件
 *  * [Source Code](https://github.com/Parkerhiphop/ithelp-ui-demo/blob/main/src/components/Icon/Icon.tsx)
 */
const Icon: React.FC<IconProps> = (props) => {
  const { className, color = "black", icon, spin = false, style, ...rest } = props;
  const { definition } = icon;

  return (
    <i
      {...rest}
      aria-hidden
      className={`
        inline-block flex-shrink-0 select-none w-em h-em
        ${spin ? "animate-spin" : ""}
        ${color ? Color[color] : ""}
        ${className ? className : ""}
      `}
      data-icon-name={icon.name}
      style={style}
    >
      <svg {...definition.svg} focusable={false}>
        <path {...definition.path} />
      </svg>
    </i>
  );
};

export default Icon;