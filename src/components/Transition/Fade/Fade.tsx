import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";


import './fade.css';

export interface FadeProps extends Omit<CSSTransitionProps, ''> {
}

export const Fade: React.FC<CSSTransitionProps> = (props) => {
  const {
    children,
    ...rest
  } = props;

  return (
    <CSSTransition
      timeout={300}
      unmountOnExit
      classNames="fade"
      {...rest}
    >
      {children}
    </CSSTransition>
  )
}
