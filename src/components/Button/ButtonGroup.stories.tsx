import { Story, Meta } from '@storybook/react';
import { ChevronDownIcon } from '../Icon/src';
import Icon from '../Icon/Icon';
import Button from './Button';
import { Orientation } from '../../system/typings';
import ButtonGroup, { ButtonGroupProps } from './ButtonGroup';
import IconButton from './IconButton';

export default {
  title: 'General/Button/ButtonGroup',
} as Meta;

const orientations: Orientation[] = [
  'horizontal',
  'vertical',
];

export const Playgroud: Story<ButtonGroupProps> = ({ attached, orientation }) => (
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

Playgroud.args = {
  attached: false,
  orientation: 'horizontal',
};
Playgroud.argTypes = {
  orientation: {
    control: {
      type: 'select',
      options: orientations,
    },
  },
};

export const DropdownLike = () => (
  <>
    <ButtonGroup
      attached
      color="primary"
      variant="contained"
    >
      <Button>click</Button>
      <IconButton>
        <Icon icon={ChevronDownIcon} />
      </IconButton>
    </ButtonGroup>
    <br />
    <br />
    <ButtonGroup
      attached
      color="primary"
      variant="outlined"
    >
      <Button>click</Button>
      <IconButton>
        <Icon icon={ChevronDownIcon} />
      </IconButton>
    </ButtonGroup>
  </>
);
