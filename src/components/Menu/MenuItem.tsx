import { forwardRef, useMemo } from 'react';
import { CheckIcon } from '../Icon/src';
import { NativeElementPropsWithoutKeyAndRef } from '../../utils/jsx-types';
import Icon from '../Icon/Icon';

export interface MenuItemProps extends NativeElementPropsWithoutKeyAndRef<'li'> {
  /**
   * Whether the menu item is active.
   * @default false
   */
  active?: boolean;
  /**
   * Whether the menu item is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The role of menu item.
   * @default 'menuitem'
   */
  role?: string;
}

/**
 * @todo
 * ClassNam
 */
const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(function MenuItem(props, ref) {
  const {
    active = false,
    children,
    className,
    disabled = false,
    onClick,
    onKeyDown = () => { },
    role = 'menuitem',
    ...rest
  } = props;

  const activeClass = useMemo(() => active ? "" : "", [active]); // ?
  const disabledClass = useMemo(() => disabled ? "bg-gray-100 opacity-40 cursor-not-allowed" : "focus:border-primary-500", [disabled]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      {...rest}
      ref={ref}
      aria-disabled={disabled}
      className={`host ${activeClass} ${disabledClass}`}
      onClick={(event) => {
        if (!disabled && onClick) {
          onClick(event);
        }
      }}
      onKeyDown={onKeyDown}
      role={role}
    >
      <div className="label">{children}</div>
      {active && <Icon className="activeIcon" icon={CheckIcon} />}
    </li>
  );
});

export default MenuItem;
