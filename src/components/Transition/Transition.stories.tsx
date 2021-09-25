import { useState } from "@storybook/addons";
import { Meta, Story } from "@storybook/react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { Fade } from "./Fade/Fade";
import Transition from "./Transition";

import './transition.css';

export default {
  title: "Utils/Transition",
  component: Transition,
} as Meta;

export const Playground: Story<CSSTransitionProps> = () => {
  const [transition, toggleTransition] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="bg-primary-500 text-white w-40 h-16 flex rounded items-center justify-center focus:outline-none mb-2"
        onClick={() => toggleTransition((prev) => !prev)}
        >Toggle Transition
      </button>
      <Transition
        in={transition}
        timeout={300}
        unmountOnExit
        classNames="transition"
      >
        <div
          className="w-52 h-52 bg-primary-500"
        />
      </Transition>
    </div>
  );
};

Playground.argTypes = {
  children: {
    description: "Transition 觸發後要 Render 的子元素）",
  },
  timeout: {
    description: "Transition 的持續時間（以毫秒為單位）",
  },
  in: {
    description: "切換 Transition `enter` 和 `exit` 的 Boolean",
    type: "boolean",
    control: "boolean",
  },
  unmountOnExit: {
    description: "載入後是否清除",
    type: "boolean",
    control: "boolean",
  },
  mountOnEnter: {
    description: "Children 在觸發 Transition 前不會先載入",
    type: "boolean",
    control: "boolean",
  },
  onEnter: {
    description: "進入 `entering` 狀態「前」觸發",
  },
  onEntering: {
    description: "進入 `entering` 狀態「後」觸發",
  },
  onEntered: {
    description: "進入 `entered` 狀態「後」觸發",
  },
  onExit: {
    description: "進入 `exiting` 狀態「前」觸發",
  },
  onExiting: {
    description: "進入 `exiting` 狀態「後」觸發",
  },
  onExited: {
    description: "進入 `exited` 狀態「前」觸發",
  },
};


export const FadeStory: Story = () => {
  const [transition, toggleTransition] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="bg-primary-500 text-white w-40 h-16 flex rounded items-center justify-center focus:outline-none mb-2"
        onClick={() => toggleTransition((prev) => !prev)}
        >Toggle Fade
      </button>
      <Fade
        in={transition}
      >
        <div
          className="w-52 h-52 bg-primary-500"
        />
      </Fade>
    </div>
  );
};