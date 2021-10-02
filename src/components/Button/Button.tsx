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
  large: `button_label h-10 ${TypographyVariant['button1']}`,
  medium: `button_label h-8 ${TypographyVariant['button2']}`,
  small: `button_label--min h-6 ${TypographyVariant['button3']}`,
};

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
    color = 'primary',
    error = false,
    disabled = false,
    loading = false,
    onClick,
    prefix: prefixProp,
    size = 'medium',
    suffix: suffixProp,
    variant = 'text',
    style,
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
    if (disabled) return Color['disabled'];
    if (error) return Color['error'];
    if (color) return Color[color];
  }, [color, disabled, error]);

  const padding = useMemo(() => {
    if (asIconBtn) return 'px-0';

    if (size === 'small') return 'px-3';

    return 'px-4';
  }, [asIconBtn, size]);

  const iconClass = useMemo(() => size === 'small' ? "text-lg" : "text-2xl", [size]);

  const variantClass = useMemo(() => {
    if (variant === 'contained') return `text-white ${ButtonVariant[variant]}-${buttonColorClass}`;

    if (variant === 'outlined') return `border-2 text-${buttonColorClass} ${ButtonVariant[variant]}-${buttonColorClass}`;

    return `${ButtonVariant[variant]}-${buttonColorClass}`;
  }, [buttonColorClass, variant]);

  const disabledClass = useMemo(() => disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-60", [disabled]);
  const loadingClass = useMemo(() => loading ? "cursor-default pointer-events-none" : "", [loading]);

  return (
    <button
      {...rest}
      ref={ref}
      aria-disabled={disabled}
      className={`relative box-border flex-center flex-shrink-0 gap-1 m-0 rounded cursor-pointer select-none whitespace-nowrap uppercase focus:outline-none ${padding} ${iconClass} ${variantClass} ${disabledClass} ${loadingClass}`}
      style={style}
      disabled={disabled}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        if (!disabled && !loading && onClick) {
          onClick(event);
        }
      }}
    >
      {prefix}
      {children && <span className={`${size ? ButtonSize[size] : ""}`}>{children}</span>}
      {suffix}
    </button>
  );
});

export default Button;