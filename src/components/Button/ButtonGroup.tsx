import {
  useMemo,
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
  attached?: boolean;
  children: ButtonGroupChild | ButtonGroupChild[];
  color?: ButtonColorType;
  error?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  orientation?: Orientation;
  size?: Size;
  spacing?: string;
  variant?: ButtonVariantType;
}

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
    spacing = 'gap-4',
    variant = 'text',
    style,
    ...rest
  } = props;

  const orientationClass = useMemo(() => orientation === 'horizontal' ? "flex flex-row" : 'inline-grid grid-flow-row ', [orientation]);
  const spaceClass = useMemo(() => !attached && spacing ? spacing : "", [attached, spacing]);
  const fullWidthClass = useMemo(() => fullWidth ? "w-full" : "", [fullWidth]);

  return (
    <div
      ref={ref}
      {...rest}
      aria-orientation={orientation}
      className={`${orientationClass} ${spaceClass} ${fullWidthClass}`}
      style={style}
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
