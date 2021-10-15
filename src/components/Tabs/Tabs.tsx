import {
  Children,
  cloneElement,
  forwardRef,
  Key,
  MouseEvent,
  ReactElement,
  ReactNode,
  useRef,
} from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../Icon/src';
import Icon from '../Icon/Icon';
import { NativeElementPropsWithoutKeyAndRef } from '../../utils/jsx-types';
import { useCustomControlValue } from '../../hooks/useCustomControlValue';
import { TabProps } from './Tab';
import { TabPaneProps } from './TabPane';
import useTabsOverflow from './useTabsOverflow';

export type TabsChild = ReactElement<TabPaneProps>;

export interface TabsProps extends
  Omit<NativeElementPropsWithoutKeyAndRef<'div'>, 'onChange' | 'children'> {
  activeKey?: Key;
  actions?: ReactNode;
  children: TabsChild | TabsChild[];
  defaultActiveKey?: Key;
  onChange?: (activeKey: Key) => void;
  onTabClick?: (key: Key, event: MouseEvent) => void;
  tabBarStyle?: object;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(props: TabsProps, ref) {
  const {
    activeKey: activeKeyProp,
    actions,
    children,
    className,
    defaultActiveKey = 0,
    onChange,
    onTabClick,
    tabBarStyle,
    style,
    ...rest
  } = props;
  const tabsRef = useRef(null);

  const [activeKey, setActiveKey] = useCustomControlValue({
    defaultValue: defaultActiveKey,
    onChange,
    value: activeKeyProp,
  });
  let pane: ReactNode | undefined;
  const tabs = Children.map(children, (tabPane, index) => {
    const key = tabPane.key ?? index;
    const { tab } = tabPane.props;
    const active = activeKey.toString() === key.toString();

    if (active) {
      pane = tabPane;
    }

    return cloneElement<TabProps>(tab, {
      key,
      active,
      onClick: (event) => {
        if (!active) {
          setActiveKey(key);
        }

        if (onTabClick) {
          onTabClick(key, event);
        }
      },
    });
  });

  const {
    isOverflowing,
    isScrollToBegin,
    isScrollToEnd,
    scrollToLeft,
    scrollToRight,
  } = useTabsOverflow(tabsRef);

  const scrollBtnClass = "";

  return (
    <div
      {...rest}
      ref={ref}
      className="host"
      style={style}
    >
      <div className="tabBar" style={tabBarStyle}
      >
        <div className="tab-overflow">
          {isOverflowing && !isScrollToBegin && (
            <button
              aria-label="scrollToLeft"
              className={scrollBtnClass}
              onClick={() => scrollToLeft()}
              type="button"
            >
              <Icon icon={ChevronLeftIcon} />
            </button>
          )}
          <div
            ref={tabsRef}
            className="tabs"
          >
            {tabs}
          </div>
          {isOverflowing && !isScrollToEnd && (
            <button
              aria-label="scrollToRight"
              className={scrollBtnClass}
              onClick={() => scrollToRight()}
              type="button"
            >
              <Icon icon={ChevronRightIcon} />
            </button>
          )}
        </div>
        {actions}
      </div>
      {pane}
    </div>
  );
});

export default Tabs;
