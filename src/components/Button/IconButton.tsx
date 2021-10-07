import { forwardRef, ReactNode } from "react";
import Button, { ButtonProps } from "./Button";

export interface IconButtonProps extends Omit<ButtonProps, | 'prefix' | 'suffix'> {
  children: ReactNode;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(props, ref) {
  const { children, ...rest } = props;

  return (
    <Button
      {...rest}
      ref={ref}
      prefix={children}
    />
  );
});

export default IconButton;
