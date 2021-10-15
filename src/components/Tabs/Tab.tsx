import { forwardRef, useMemo } from 'react';
import { NativeElementPropsWithoutKeyAndRef } from '../../utils/jsx-types';

export interface TabProps extends NativeElementPropsWithoutKeyAndRef<'button'> {
  /**
   * Whether the tab is active.
   * Controlled by tabs.
   */
  active?: boolean;
  /**
   * Whether the tab is disabled
   * @default false
   */
  disabled?: boolean;
}

const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(props, ref) {
  const {
    active,
    children,
    className,
    disabled,
    style,
    ...rest
  } = props;

  const activeClass = useMemo(() => active ? "tabActive" : "", [active]);

  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      aria-disabled={disabled}
      className={`tab ${activeClass}`}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

export default Tab;
