import { forwardRef, ReactNode } from 'react';
import { ExclamationCircleFilledIcon, IconDefinition } from '../Icon/src';
import Icon from '../Icon/Icon';
import Popover, { PopoverProps } from '../Popover/Popover';
import ConfirmActions, { ConfirmActionsProps } from '../ConfirmActions/ConfirmActions';

export interface PopconfirmProps
  extends
  PopoverProps,
  Pick<
  ConfirmActionsProps,
  | 'cancelButtonProps'
  | 'cancelText'
  | 'confirmButtonProps'
  | 'confirmText'
  | 'onCancel'
  | 'onConfirm'
  > {
  /**
   * Customize the icon on the popconfirm
   */
  icon?: IconDefinition;
  /**
   * the title of the confirmation box
   */
  title?: ReactNode;
}

const Popconfirm = forwardRef<HTMLDivElement, PopconfirmProps>(function Popconfirm(props, ref) {
  const {
    className,
    container,
    cancelButtonProps,
    cancelText,
    confirmButtonProps,
    confirmText,
    icon = ExclamationCircleFilledIcon,
    onCancel,
    onConfirm,
    title,
    style,
    ...rest
  } = props;

  return (
    <Popover
      {...rest}
      ref={ref}
      className="min-width-popconfirm"
      style={style}
      title={(
        <>
          <Icon className={`m-2 text-2xl text-primary-500`} icon={icon} />
          {title}
        </>
      )}
    >
      <div className="mt-4 flex justify-end">
        <ConfirmActions
          cancelButtonProps={cancelButtonProps}
          cancelText={cancelText}
          confirmButtonProps={confirmButtonProps}
          confirmText={confirmText}
          onCancel={onCancel}
          onConfirm={onConfirm}
          size="small"
        />
      </div>

    </Popover>
  );
});

export default Popconfirm;
