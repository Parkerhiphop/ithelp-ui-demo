import { Story, Meta } from '@storybook/react';
import { useRef } from 'react';
import { Typography } from '../Typography/Typography';
import Portal from './Portal';

export default {
  title: 'Utility/Portal',
} as Meta;

const demoElement = (
  <div className="border border-primary-500 px-1">
    I am Portaled Element！
  </div>
);

export const Common: Story<{}> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-full h-32 bg-gray-100">
        <Typography>
          The container wrapping portal.
        </Typography>
        <Portal container={containerRef}>
          {demoElement}
        </Portal>
      </div>
      <div className="w-full h-32 bg-gray-300"
        ref={containerRef}
      >
        <Typography>
          The portal destination.
        </Typography>
      </div>
    </>
  );
};

Common.args = {
  disablePortal: false,
}

Common.argTypes = {
  children: {
    description: "Portal 要傳送的 Element",
    type: "string",
    control: "text",
  },
  container: {
    description: "Portal 要傳送的位置",
    type: "string",
    control: "text",
  },
  disablePortal: {
    description: '取消 Portal 功能',
    control: 'boolean',
  }
}