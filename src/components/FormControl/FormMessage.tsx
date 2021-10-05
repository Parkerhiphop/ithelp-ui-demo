import { forwardRef, useContext } from 'react';
import { NativeElementPropsWithoutKeyAndRef } from '../../utils/jsx-types';
import Icon from '../Icon/Icon';
import {
  CheckCircleFilledIcon,
  ExclamationCircleFilledIcon,
  MinusCircleFilledIcon,
} from '../Icon/src';
import { FormControlContext } from './FormControlContext';


export type FormMessageProps = NativeElementPropsWithoutKeyAndRef<'span'>;

export const formMessageIcons = {
  success: CheckCircleFilledIcon,
  warning: ExclamationCircleFilledIcon,
  error: MinusCircleFilledIcon,
};

/**
 * @todo
 * ClassName
 */
const FormMessage = forwardRef<HTMLSpanElement, FormMessageProps>(function FormMessage(props, ref) {
  const {
    children,
    style,
    ...rest
  } = props;
  const { severity } = useContext(FormControlContext) || {};
  const icon = severity ? formMessageIcons[severity] : null;

  return (
    <span
      {...rest}
      ref={ref}
      className="message"
      style={style}
    >
      {icon && (
        <Icon
          className="severityIcon"
          icon={icon}
        />
      )}
      {children}
    </span>
  );
});

export default FormMessage;
