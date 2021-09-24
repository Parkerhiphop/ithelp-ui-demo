import { Meta, Story } from "@storybook/react";
import React from "react";
import { colors } from "../../system/typings";

import {
  Typography,
  TypographyAlignType,
  TypographyProps,
  TypographyVariantType,
} from "./Typography";

const aligns: TypographyAlignType[] = ["left", "center", "right", "justify"];

const variants: TypographyVariantType[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "body1",
  "body2",
  "button1",
  "button2",
  "button3",
  "input1",
  "input2",
  "input3",
  "caption",
];

export default {
  title: "General/Typography",
  component: Typography,
} as Meta;

const Template: Story<TypographyProps> = ({ children, ...props }) => (
  <Typography {...props} className="w-48">
    {children}
  </Typography>
);

export const Playground = Template.bind({});

Playground.args = {
  children:
    "Hello Typography! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiisitaquequodpraesentiumexplicaboincidunt? Dolores beatae nam at sed dolorum ratione dolorem nisi velit cum.",
  variant: "body1",
  ellipsis: false,
  noWrap: false,
  color: "black",
  align: "left",
};

Playground.argTypes = {
  align: {
    description: "文字對齊的方式 （`text-align` 的值）",
    type: "string",
    table: {
      type: {
        summary: aligns.map((a) => a),
      },
    },
    options: aligns,
    control: "select",
  },
  children: {
    description: "Typography 要顯示的文字",
    type: { name: "string", required: true },
    table: {
      type: {
        summary: variants.map((v) => v),
        defaultValue: {
          summary: "true",
        },
      },
    },
    control: "text",
  },
  className: {
    description: "客製化 Typography 的 Tailwind utility class",
    type: "string",
    table: {
      type: {
        summary: "Tailwind Utility Class",
      },
    },
    control: "text",
  },
  color: {
    description: "因應 Design System Palette 會賦予文字的顏色們",
    type: "string",
    table: {
      type: {
        summary: colors.map((c) => c),
        defaultValue: {
          summary: "black",
        },
      },
    },
    options: colors,
    control: "select",
  },
  ellipsis: {
    description:
      '讓超出區塊寬度的文字變成 "..."，Demo 參照 [Tailwind Text-Overflow](https://tailwindcss.tw/docs/text-overflow#overflow-ellipsis)',
    type: "boolean",
    control: "boolean",
  },
  noWrap: {
    description: "文字是否換行",
    type: "boolean",
    control: "boolean",
  },
  variant: {
    description: "文字在 Design System 裏的層級",
    type: "string",
    table: {
      type: {
        summary: variants.map((v) => v),
        defaultValue: {
          summary: "true",
        },
      },
    },
    options: variants,
    control: "select",
  },
};

export const Variants = () => (
  <div className="flex flex-col items-start gap-2">
    <Typography variant="h1">h1. Heading</Typography>
    <Typography variant="h2">h2. Heading</Typography>
    <Typography variant="h3">h3. Heading</Typography>
    <Typography variant="h4">h4. Heading</Typography>
    <Typography variant="h5">h5. Heading</Typography>
    <Typography variant="h6">h6. Heading</Typography>
    <br />
    <Typography variant="body1">
      body1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
      asperiores fuga porro officiis mollitia qui, consectetur sed provident
      suscipit voluptate quae similique minima itaque officia non impedit
      perferendis quis consequatur?
    </Typography>
    <Typography variant="body2">
      body2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
      asperiores fuga porro officiis mollitia qui, consectetur sed provident
      suscipit voluptate quae similique minima itaque officia non impedit
      perferendis quis consequatur?
    </Typography>
    <br />
    <Typography variant="button1">button 1</Typography>
    <Typography variant="button2">button 2</Typography>
    <Typography variant="button3">button 3</Typography>
    <Typography variant="input1">input 1</Typography>
    <Typography variant="input2">input 2</Typography>
    <Typography variant="input3">input 3</Typography>
    <Typography variant="caption">caption text</Typography>
  </div>
);

export const Colors = () => (
  <>
    {colors.map((color) => (
      <Typography key={color} color={color}>
        {color}
      </Typography>
    ))}
  </>
);
