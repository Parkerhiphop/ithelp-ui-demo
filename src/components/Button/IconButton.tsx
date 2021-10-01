import { forwardRef, ReactNode } from "react";
import Button, { ButtonProps } from "./Button";

export interface IconButtonProps extends Omit<ButtonProps, | 'prefix' | 'suffix'> {
  children: ReactNode; // 把 children 改成 icon
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(props, ref) {
  const { children, ...rest } = props;

  return (
    <Button
      {...rest}
      prefix={children}
    />
  );
});

export default IconButton;
