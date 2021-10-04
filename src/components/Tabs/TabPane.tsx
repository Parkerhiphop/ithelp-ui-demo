import { forwardRef, ReactElement } from 'react';
import { NativeElementPropsWithoutKeyAndRef } from '../../utils/jsx-types';
import { TabProps } from './Tab';

export interface TabPaneProps extends NativeElementPropsWithoutKeyAndRef<'div'> {
  /**
   * Only for tabs to control the tab pane.
   */
  tab: ReactElement<TabProps>;
}

/**
 * The react component for `mezzanine` tab pane.
 */
const TabPane = forwardRef<HTMLDivElement, TabPaneProps>(function TabPane(props, ref) {
  const {
    children,
    style,
    /**
     * Ignore it
     */
    tab,
    ...rest
  } = props;

  return (
    <div
      {...rest}
      ref={ref}
      className="pane"
      style={style}
    >
      {children}
    </div>
  );
});

export default TabPane;
