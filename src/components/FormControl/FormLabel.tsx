import {
  forwardRef,
  ReactNode,
  useContext,
} from 'react';
import { NativeElementPropsWithoutKeyAndRef } from '../../utils/jsx-types';
import { FormControlContext } from './FormControlContext';

export interface FormLabelProps extends NativeElementPropsWithoutKeyAndRef<'label'> {
  remark?: ReactNode;
  remarkIcon?: ReactNode;
}

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(function FormLabel(props, ref) {
  const {
    children,
    className,
    htmlFor,
    remark,
    remarkIcon,
    style,
    ...rest
  } = props;
  const { required } = useContext(FormControlContext) || {};

  return (
    <label
      {...rest}
      ref={ref}
      className="label"
      style={style}
      htmlFor={htmlFor}
    >
      <span>
        {children}
        {required && <span className="asterisk">*</span>}
      </span>
      {(remark || remarkIcon) && (
        <span className="remark">
          <span>{remark}</span>
          {remarkIcon}
        </span>
      )}
    </label>
  );
});

export default FormLabel;
