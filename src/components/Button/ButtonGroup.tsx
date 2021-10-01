import {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
} from 'react';
import { Orientation, Size } from '../../system/typings';
import { ButtonColorType, ButtonProps, ButtonVariantType } from './Button';
import { IconButtonProps } from './IconButton';

export type ButtonGroupChild = ReactElement<ButtonProps | IconButtonProps> | null | undefined | false;

export interface ButtonGroupProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * If `true`, all buttons will not have spacing between each others.
   * @default false
   */
  attached?: boolean;
  /**
   * Only accept button elements or icon button elements.
   */
  children: ButtonGroupChild | ButtonGroupChild[];
  /**
   * If the `color` of a button inside group not provided, the `color` of group will override it.
   * @default 'primary'
   */
  color?: ButtonColorType;
  /**
   * If the `danger` of a button inside group not provided, the `danger` of group will override it.
   * @default false
   */
  error?: boolean;
  /**
   * If the `disabled` of a button inside group not provided, the `disabled` of group will override it.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, set width: 100%.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The orientation of button group.
   * @default horizontal
   */
  orientation?: Orientation;
  /**
   * If the `size` of a button inside group not provided, the `size` of group will override it.
   * @default 'medium'
   */
  size?: Size;
  /**
   * The spacing level of button gap between each buttons.
   * Will be added on if `attached`=false.
   * @default 'space-x-4'
   */
  spacing?: string;
  /**
   * If the `variant` of a button inside group not provided, the `variant` of group will override it.
   * @default 'text'
   */
  variant?: ButtonVariantType;
}

/**
 * The react component for `mezzanine` button group.
 */
const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(props, ref) {
  const {
    attached = false,
    children,
    className,
    color = 'primary',
    error = false,
    disabled = false,
    fullWidth = false,
    orientation = 'horizontal',
    role = 'group',
    size = 'medium',
    spacing = 'space-x-4',
    variant = 'text',
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      {...rest}
      aria-orientation={orientation}
      className={`
        flex
        ${orientation === 'horizontal' ? "flex-row" : "flex-col"}
        ${!attached && spacing ? spacing : ""}
        ${fullWidth ? "w-full" : ""}
        ${className ? className : ""}
      `}
      role={role}
    >
      {Children.map(children, (unknownChild) => {
        const child = unknownChild as ButtonGroupChild;

        if (!child) {
          return null;
        }

        return cloneElement(child, {
          color: child.props.color || color,
          error: child.props.error ?? error,
          disabled: child.props.disabled ?? disabled,
          size: child.props.size || size,
          variant: child.props.variant || variant,
        });
      })}
    </div>
  );
});

export default ButtonGroup;
