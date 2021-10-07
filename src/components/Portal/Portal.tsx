import {
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { ElementGetter, getElement } from '../../utils/getElement';

export interface PortalProps {
  children?: ReactNode;
  container?: ElementGetter;
  disablePortal?: boolean;
}

const Portal: FC<PortalProps> = (props) => {
  const {
    children,
    container,
    disablePortal = false,
  } = props;

  const [portalElement, setPortalElement] = useState(() => (
    disablePortal
      ? null
      : getElement(container) || document.body
  ));

  useEffect(() => {
    if (!disablePortal) {
      setPortalElement(getElement(container) || document.body);
    }
  }, [container, disablePortal]);

  if (disablePortal || !portalElement) {
    return <>{children}</>;
  }

  return createPortal(children, portalElement);
};

export default Portal;
