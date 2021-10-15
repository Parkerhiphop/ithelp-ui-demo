import {
  useMemo,
  forwardRef,
  ReactNode,
} from 'react';
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
  children?: ReactNode;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  prefix?: ReactNode;
  size?: Size;
  suffix?: ReactNode;
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps>(function TextField(props, ref) {
  const {
    children,
    className,
    disabled = false,
    error = false,
    fullWidth,
    onClick: onClickProps,
    onKeyDown: onKeyDownProps,
    prefix,
    role: roleProp,
    size = 'medium',
    suffix,
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

  const disabledClass = useMemo(() => disabled ? "bg-gray-100 opacity-40 cursor-not-allowed" : "", [disabled]);
  const errorClass = useMemo(() => error ? `border-${Color['error']}` : "", [error]);
  const fullWidthClass = useMemo(() => fullWidth ? "w-full" : "", [fullWidth]);
  const withPrefixClass = useMemo(() => prefix ? "pl-1" : "", [prefix]);
  const withSuffixClass = useMemo(() => suffix ? "pr-1" : "", [suffix]);

  return (
    <div
      {...rest}
      ref={ref}
      role={roleProp || role}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`relative box-border inline-flex border text-black ${withPrefixClass} ${withSuffixClass} ${size ? TextFieldSize[size] : ""} ${disabledClass} ${errorClass} ${fullWidthClass}`}
      style={style}
    >
      {prefix && <div className="flex items-center flex-shrink-0 left-1 text-2xl px-1">{prefix}</div>}
      {children}
      {suffix && <div className="flex items-center flex-shrink-0 right-1 text-2xl px-1">{suffix}</div>}
    </div>
  );
});

export default TextField;
