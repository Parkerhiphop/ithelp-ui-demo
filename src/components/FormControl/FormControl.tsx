import { forwardRef, useMemo } from 'react';
import { Severity as SeverityType } from '../../system/typings';
import { NativeElementPropsWithoutKeyAndRef } from '../../utils/jsx-types';
import { FormControlContextProps, FormControlContext } from './FormControlContext';

export const FormSeverity = {
  success: "",
  warning: "",
  error: "",
};

export interface FormControlProps extends NativeElementPropsWithoutKeyAndRef<'div'> {
  disabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  severity?: SeverityType;
}

const FormControl = forwardRef<HTMLDivElement, FormControlProps>(function FormControl(props, ref) {
  const {
    children,
    disabled = false,
    fullWidth = false,
    required = false,
    severity,
    ...rest
  } = props;
  const formControl: FormControlContextProps = {
    disabled,
    fullWidth,
    required,
    severity,
  };

  const disabledClass = useMemo(() => disabled ? "bg-gray-100 opacity-40 cursor-not-allowed" : "", [disabled]);
  const fullWidthClass = useMemo(() => fullWidth ? "w-full" : "", [fullWidth]);


  return (
    <div
      {...rest}
      ref={ref}
      className={`host ${severity ? FormSeverity[severity] : ""} ${disabledClass} ${fullWidthClass}`}
    >
      <FormControlContext.Provider value={formControl}>
        {children}
      </FormControlContext.Provider>
    </div>
  );
});

export default FormControl;
