import {
  useMemo,
  forwardRef,
  MouseEventHandler,
  ReactNode,
  cloneElement,
  ReactElement,
} from 'react';
import { TimesIcon } from '../Icon/src';
import Icon from '../Icon/Icon';
import { Color, Size } from '../../system/typings';
import useTextFieldControl from './useTextFieldControl';
import { TypographyVariant } from '../Typography/Typography';


export const TextFieldSize = {
  large: `textfield ${TypographyVariant['input1']} px-4`,
  medium: `textfield ${TypographyVariant['input2']} px-4`,
  small: `textfield--min ${TypographyVariant['input3']} px-3`,
};


export interface TextFieldProps extends
  Omit<React.ComponentPropsWithRef<'div'>, 'defaultValue' | 'onChange' | 'prefix'> {
  /**
   * Whether the field is active.
   */
  active?: boolean;
  children?: ReactNode;
  className?: string;
  /**
   * Whether to show the clear button.
   * @default false
   */
  clearable?: boolean;
  /**
   * Whether the field is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the field is error.
   * @default false
   */
  error?: boolean;
  /**
   * If `true`, set width: 100%.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The callback will be fired after clear icon clicked.
   */
  onClear?: MouseEventHandler;
  /**
   * The prefix addon of the field.
   */
  prefix?: ReactNode;
  /**
   * The size of field.
   * @default 'medium'
   */
  size?: Size;
  /**
   * The suffix addon of the field.
   */
  suffix?: ReactNode;
  suffixActionIcon?: ReactElement;
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps>(function TextField(props, ref) {
  const {
    active = false,
    children,
    className,
    clearable = false,
    disabled = false,
    error = false,
    fullWidth,
    onClear,
    onClick: onClickProps,
    onKeyDown: onKeyDownProps,
    prefix,
    role: roleProp,
    size = 'medium',
    suffix,
    suffixActionIcon,
    style,
    ...rest
  } = props;

  const {
    role,
    onClick,
    onKeyDown,
  } = useTextFieldControl({
    onClick: onClickProps,
    onKeyDown: onKeyDownProps,
  });

  const activeClass = useMemo(() => active ? "" : "", [active]); // ?
  const clearableClass = useMemo(() => clearable ? "" : "", [clearable]); // ?
  const disabledClass = useMemo(() => disabled ? "bg-gray-100 opacity-40 cursor-not-allowed" : "focus:border-primary-500", [disabled]);
  const errorClass = useMemo(() => error ? `border-${Color['error']}` : "", [error]);
  const fullWidthClass = useMemo(() => fullWidth ? "w-full" : "", [fullWidth]);
  const withPrefixClass = useMemo(() => prefix ? "" : "", [prefix]); // padding-left
  const withSuffixClass = useMemo(() => suffix || suffixActionIcon ? "" : "", [suffix, suffixActionIcon]); // padding-right

  return (
    <div
      {...rest}
      ref={ref}
      role={roleProp || role}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`relative box-border inline-flex border text-black
      ${size ? TextFieldSize[size] : ""} ${activeClass} ${clearableClass} ${disabledClass} ${errorClass} ${fullWidthClass} ${withPrefixClass} ${withSuffixClass}`}
      style={style}
    >
      {prefix && <div className="prefix">{prefix}</div>}
      {children}
      {suffix && <div className="suffix">{suffix}</div>}
      {suffixActionIcon && cloneElement(suffixActionIcon, {
        className: `classes.actionIcon, ${suffixActionIcon.props.className}`,
        role: 'button',
        tabIndex: -1,
      })}
      {clearable && (
        <Icon
          className="clearIcon"
          icon={TimesIcon}
          onClick={(event) => {
            if (!disabled && onClear) {
              onClear(event);
            }
          }}
          onMouseDown={(event) => event.preventDefault()}
          role="button"
          tabIndex={-1}
        />
      )}
    </div>
  );
});

export default TextField;
