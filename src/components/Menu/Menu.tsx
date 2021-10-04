import { forwardRef, useMemo } from 'react';
import { Size } from "../../system/typings";
import { NativeElementPropsWithoutKeyAndRef } from '../../utils/jsx-types';

export const MenuSize = {
  large: ``,
  medium: ``,
  small: ``,
}

export interface MenuProps extends NativeElementPropsWithoutKeyAndRef<'ul'> {
  /**
   * The minimum items count in scroll container.
   * @default 4;
   */
  itemsInView?: number;
  /**
   * The custom menu max height.
   */
  maxHeight?: number;
  /**
   * The role of menu.
   * @default 'menu'
   */
  role?: string;
  /**
   * The size of menu.
   * @default 'medium'
   */
  size?: Size;
}

/**
 * The react component for `mezzanine` menu.
 */
const Menu = forwardRef<HTMLUListElement, MenuProps>(function Menu(props, ref) {
  const {
    children,
    className,
    itemsInView = 4,
    maxHeight,
    role = 'menu',
    size = 'medium',
    style,
    ...rest
  } = props;
  const itemsInViewClass = useMemo(() => `${itemsInView}`, [itemsInView]);
  const maxHeightClass = useMemo(() => `${maxHeight}`, [maxHeight]);

  return (
    <ul
      {...rest}
      ref={ref}
      className={`host ${size ? MenuSize[size] : ""} ${itemsInViewClass} ${maxHeightClass}`}
      role={role}
      style={style}
    >
      {children}
    </ul>
  );
});

export default Menu;
