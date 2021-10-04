import {
  forwardRef,
  Ref,
  ChangeEventHandler,
  useRef,
} from 'react';
import { NativeElementPropsWithoutKeyAndRef } from '../../utils/jsx-types';
import TextField, { TextFieldProps } from "../TextField/TextField";
import { Size } from '../../system/typings';
import { useComposeRefs } from '../../hooks/useComposeRefs';
import { useInputControlValue } from '../../hooks/useInputControlValue';

export interface InputProps extends Omit<TextFieldProps, 'active' | 'children' | 'onClear' | 'onKeyDown'> {
  /**
   * The default value of input.
   */
  defaultValue?: string;
  /**
   * The react ref passed to input element.
   */
  inputRef?: Ref<HTMLInputElement>;
  /**
   * The other native props for input element.
   */
  inputProps?: Omit<
    NativeElementPropsWithoutKeyAndRef<'input'>,
    | 'defaultValue'
    | 'disabled'
    | 'onChange'
    | 'placeholder'
    | 'readOnly'
    | 'required'
    | 'value'
    | `aria-${'disabled' | 'multiline' | 'readonly' | 'required'}`
  >;
  /**
   * The change event handler of input element.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * The placeholder of input.
   */
  placeholder?: string;
  /**
   * Whether the input is readonly.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Whether the input is required.
   * @default false
   */
  required?: boolean;
  /**
   * The size of input.
   * @default 'medium'
   */
  size?: Size;
  /**
   * The value of input.
   */
  value?: string;
}

const Input = forwardRef<HTMLDivElement, InputProps>(function Input(props, ref) {
  // FormControlContext ???

  const {
    clearable = false,
    defaultValue,
    disabled,
    error,
    fullWidth,
    inputRef: inputRefProp,
    inputProps,
    onChange: onChangeProp,
    placeholder,
    prefix,
    readOnly = false,
    required,
    size = 'medium',
    suffix,
    value: valueProp,
    style,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  // const [
  //   value,
  //   onChange,
  //   onClear,
  // ] = useInputWithClearControlValue({
  //   defaultValue,
  //   onChange: onChangeProp,
  //   ref: inputRef,
  //   value: valueProp,
  // });
  const [value, onChange] = useInputControlValue({
    defaultValue,
    onChange: onChangeProp,
    value: valueProp,
  });

  const composedInputRef = useComposeRefs([inputRefProp, inputRef]);
  const active = !!value;

  return (
    <TextField
      ref={ref}
      active={active}
      className="host"
      clearable={clearable}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      prefix={prefix}
      size={size}
      suffix={suffix}
      style={style}
    >
      <input
        {...inputProps}
        ref={composedInputRef}
        aria-disabled={disabled}
        aria-multiline={false}
        aria-readonly={readOnly}
        aria-required={required}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        value={value}
      />
    </TextField>
  );
});

export default Input;
