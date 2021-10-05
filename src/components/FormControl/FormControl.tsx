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
  /**
   * To control the field passed from children whether should be disabled.
   * The form message won't appear if disabled.
   */
  disabled?: boolean;
  /**
   * To control the field passed from children whether should be fullWidth.
   */
  fullWidth?: boolean;
  /**
   * To control the field passed from children whether should be required.
   */
  required?: boolean;
  /**
   * To control the severity of field passed from children and form message.
   */
  severity?: SeverityType;
}


/**
 * The react component for `mezzanine` form field.
 */
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

  const disabledClass = useMemo(() => disabled ? "bg-gray-100 opacity-40 cursor-not-allowed" : "focus:border-primary-500", [disabled]);
  const fullWidthClass = useMemo(() => fullWidth ? "bg-gray-100 opacity-40 cursor-not-allowed" : "focus:border-primary-500", [fullWidth]);


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
