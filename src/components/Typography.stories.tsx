import React from "react";

import { Typography } from "./Typography";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "General/Typography",
  component: Typography,
}

const Template = (args) => <Typography {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Typography",
};
