import { forwardRef, ReactNode, useRef } from 'react';
import { StrictModifiers } from '@popperjs/core';
import Popper, { PopperProps } from '../Popper/Popper';
import { ClickAwayEvent, useClickAway } from '../../hooks/useClickAway';
import { useComposeRefs } from '../../hooks/useComposeRefs';

const offsetModifier: StrictModifiers = {
  name: 'offset',
  options: {
    offset: [0, 8],
  },
};

export interface PopoverProps extends Omit<PopperProps, 'title'> {
  /**
   * Whether to disable triggering onClose while clicked away.
   * @default false
   */
  disableClickAway?: boolean;
  /**
   * The handler fired while clicked away.
   */
  onClose?: (event: ClickAwayEvent) => void;
  /**
   * the title of popover
   */
  title?: ReactNode;
}

/**
 * The react component for `mezzanine` popover.
 */
const Popover = forwardRef<HTMLDivElement, PopoverProps>(function Popover(props, ref) {
  const {
    children,
    className,
    disableClickAway = false,
    onClose,
    open,
    options = {},
    title,
    style,
    ...rest
  } = props;
  const { modifiers = [] } = options;
  const popoverRef = useRef<HTMLDivElement>(null);
  const composedRef = useComposeRefs([ref, popoverRef]);

  useClickAway(
    () => {
      if (!open || disableClickAway || !onClose) {
        return;
      }

      return (event) => {
        if (onClose) {
          onClose(event);
        }
      };
    },
    popoverRef,
    [
      open,
      disableClickAway,
      onClose,
      popoverRef,
    ],
  );

  return (
    <Popper
      {...rest}
      ref={composedRef}
      className="classes.host"
      style={style}
      open={open}
      options={{
        ...options,
        modifiers: [offsetModifier, ...modifiers],
      }}
    >
      {title && <div className="title">{title}</div>}
      {children && <div className="content">{children}</div>}
    </Popper>
  );
});

export default Popover;
