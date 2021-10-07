import { Story, Meta } from '@storybook/react';
import Button from './Button';
import { Orientation } from '../../system/typings';
import ButtonGroup, { ButtonGroupProps } from './ButtonGroup';

export default {
  title: 'General/Button/ButtonGroup',
} as Meta;

const orientations: Orientation[] = [
  'horizontal',
  'vertical',
];

export const Playground: Story<ButtonGroupProps> = ({ attached, orientation }) => (
  <>
    <ButtonGroup
      attached={attached}
      color="primary"
      variant="contained"
      size="large"
      orientation={orientation}
    >
      <Button>one</Button>
      <Button>two</Button>
      <Button>three</Button>
    </ButtonGroup>
    <br />
    <br />
    <ButtonGroup
      attached={attached}
      color="secondary"
      variant="outlined"
      size="medium"
      orientation={orientation}
    >
      <Button>one</Button>
      <Button>two</Button>
      <Button>three</Button>
    </ButtonGroup>
    <br />
    <br />
    <ButtonGroup
      attached={attached}
      error
      variant="text"
      size="small"
      orientation={orientation}
    >
      <Button>one</Button>
      <Button>two</Button>
      <Button>three</Button>
    </ButtonGroup>
  </>
);

Playground.args = {
  attached: false,
  orientation: 'horizontal',
};
Playground.argTypes = {
  orientation: {
    description: "Button 們排列的方向",
    control: {
      type: 'select',
      options: orientations,
    },
  },
  spacing: {
    description: "Button 們之間的距離，參照 [Tailwind Gap](https://tailwindcss.tw/docs/gap)",
    control: 'string',
  },
  attached: {
    description: '讓 Button 們黏在一起',
    control: 'boolean',
  }
};
