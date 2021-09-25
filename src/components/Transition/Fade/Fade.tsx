import Transition, { TransitionProps } from "../Transition";

import './fade.css';

export interface FadeProps extends TransitionProps {
}

export const Fade: React.FC<FadeProps> = (props) => {
  const {
    children,
    ...rest
  } = props;

  return (
    <Transition
      timeout={300}
      unmountOnExit
      classNames="fade"
      {...rest}
    >
    {children}
  </Transition>
  )
}
