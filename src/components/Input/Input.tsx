import {
  forwardRef,
  Ref,
  ChangeEventHandler,
  useRef,
  useContext,
} from 'react';
import { NativeElementPropsWithoutKeyAndRef } from '../../utils/jsx-types';
import TextField, { TextFieldProps } from "../TextField/TextField";
import { Size } from '../../system/typings';
import { useComposeRefs } from '../../hooks/useComposeRefs';
import { useInputControlValue } from '../../hooks/useInputControlValue';
import { FormControlContext } from '../FormControl/FormControlContext';

export const InputSizes = {
  large: `px-4`,
  medium: `px-4`,
  small: `px-3`,
};
export interface InputProps extends Omit<TextFieldProps, 'active' | 'children' | 'onClear' | 'onKeyDown'> {
  defaultValue?: string;
  inputRef?: Ref<HTMLInputElement>;
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
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  size?: Size;
  value?: string;
}

const Input = forwardRef<HTMLDivElement, InputProps>(function Input(props, ref) {
  const {
    disabled: disabledFromFormControl,
    fullWidth: fullWidthFromFormControl,
    required: requiredFromFormControl,
    severity,
  } = useContext(FormControlContext) || {};

  const {
    defaultValue,
    disabled = disabledFromFormControl || false,
    error = severity === 'error' || false,
    fullWidth = fullWidthFromFormControl || false,
    inputRef: inputRefProp,
    inputProps,
    onChange: onChangeProp,
    placeholder,
    prefix,
    readOnly = false,
    required = requiredFromFormControl || false,
    size = 'medium',
    suffix,
    value: valueProp,
    style,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, onChange] = useInputControlValue({
    defaultValue,
    onChange: onChangeProp,
    value: valueProp,
  });

  const composedInputRef = useComposeRefs([inputRefProp, inputRef]);

  return (
    <TextField
      ref={ref}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      prefix={prefix}
      size={size}
      suffix={suffix}
      style={{
        padding: 0,
        ...style,
      }}
    >
      <input
        {...inputProps}
        className={`focus:outline-none ${!prefix && size ? InputSizes[size] : ""}`}
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
