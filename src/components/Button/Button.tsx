import React, { forwardRef, MouseEvent, ReactNode, useMemo } from 'react';
import { Color, ColorType, Size } from "../../system/typings";
import Icon from '../Icon/Icon';
import { SpinnerIcon } from '../Icon/src/spinner';
import { TypographyVariant } from '../Typography/Typography';

export type ButtonColorType = Extract<ColorType, 'primary' | 'secondary' | 'error' | 'disabled'>;

export const ButtonVariant = {
  contained: "bg",
  outlined: "border",
  text: "text",
};

export type ButtonVariantType = keyof typeof ButtonVariant;

export const ButtonSize = {
  large: `h-10 ${TypographyVariant['button1']} p-4`,
  medium: `h-8 ${TypographyVariant['button2']} p-4`,
  small: `h-6 ${TypographyVariant['button3']} p-3`,
};

export type ButtonComponent = 'button' | 'a';

// 概念：先繼承原生的 Button Props 再來擴充需要的 Props
export interface ButtonProps extends Omit<React.ComponentPropsWithRef<'button'>, 'prefix'> {
  /**
   * The color name provided by palette.
   * @default 'primary'
   */
  color?: ButtonColorType;
  /**
   * If true, will use error color instead of color from props.
   * @default false
   */
  error?: boolean;
  /**
   * If true, button will be disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, replace the original icon.
   * Replace suffix if only suffix provided, or prefix.
   * @default false
   */
  loading?: boolean;
  /**
   * The element placed on the start of button.
   */
  prefix?: ReactNode;
  /**
   * The size of button.
   * @default 'medium'
   */
  size?: Size;
  /**
   * The element placed on the end of button.
   */
  suffix?: ReactNode;
  /**
   * The variant of button.
   * @default 'text'
   */
  variant?: ButtonVariantType;
}

/**
 * @todo
 * ClassName Refactor
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const {
    children,
    className,
    color = 'primary',
    error = false,
    disabled = false,
    loading = false,
    onClick,
    prefix: prefixProp,
    size = 'medium',
    suffix: suffixProp,
    variant = 'text',
    ...rest
  } = props;

  let prefix: ReactNode = prefixProp;
  let suffix: ReactNode = suffixProp;

  if (loading) {
    const loadingIcon = <Icon icon={SpinnerIcon} spin />;

    if (suffix && !prefix) {
      suffix = loadingIcon;
    } else {
      prefix = loadingIcon;
    }
  }

  const asIconBtn = children == null && !!(prefix || suffix);

  const buttonColorClass = useMemo(() => {
    if (disabled) {
      return Color['disabled'];
    } else if (error) {
      return Color['error'];
    } else if (color) {
      return Color[color];
    }
  }, [color, disabled, error]);

  return (
    <button
      {...rest}
      ref={ref}
      aria-disabled={disabled}
      className={`
        w-auto
        relative box-border flex-center flex-shrink-0 m-0 rounded
        cursor-pointer select-none whitespace-nowrap uppercase
        focus:outline-none
        text-${variant === 'contained' ? 'white' : buttonColorClass}
        ${ButtonVariant[variant]}-${buttonColorClass}
        ${size ? ButtonSize[size] : ""}
        ${variant === 'outlined' ? "border-2" : "border-none"}
        ${disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-60"}
        ${asIconBtn ? "" : ""}
        ${loading ? "" : ""}
        ${className ? className : ""}
        `}
      disabled={disabled}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        if (!disabled && !loading && onClick) {
          onClick(event);
        }
      }}
    >
      {prefix}
      {children && <span className="label">{children}</span>}
      {suffix}
    </button>
  );
});

export default Button;