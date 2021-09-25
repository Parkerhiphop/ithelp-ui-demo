import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
export interface TransitionProps extends Omit<CSSTransitionProps, ''> {
}

export const Transition: React.FC<CSSTransitionProps> = (props) => {  
  return (
    <CSSTransition
      {...props}
    >
      {/* {children} */}
    </CSSTransition>
  )
}

export default Transition;
