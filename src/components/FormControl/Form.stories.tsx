import { Story, Meta } from '@storybook/react';
import { InfoCircleFilledIcon } from '../Icon/src';
import { Severity } from '../../system/typings';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import FormControl from './FormControl';
import FormLabel from './FormLabel';
import FormMessage from './FormMessage';

export default {
  title: 'Data Entry/Form',
} as Meta;

const severities: Severity[] = [
  'error',
  'success',
  'warning',
];

interface PlaygroundStoryArgs {
  disabled: boolean;
  fullWidth: boolean;
  label: string;
  message: string;
  remark: string;
  required: boolean;
  severity?: Severity;
  showRemarkIcon: boolean;
}

export const Playground: Story<PlaygroundStoryArgs> = ({
  disabled,
  fullWidth,
  label,
  message,
  remark,
  required,
  severity,
  showRemarkIcon,
}) => (
  <FormControl
    disabled={disabled}
    fullWidth={fullWidth}
    required={required}
    severity={severity}
  >
    <FormLabel
      remark={remark}
      remarkIcon={showRemarkIcon && <Icon icon={InfoCircleFilledIcon} />}
    >
      {label}
    </FormLabel>
    <Input
      placeholder="please enter text"
    />
    <FormMessage>{message}</FormMessage>
  </FormControl>
);

Playground.args = {
  disabled: false,
  fullWidth: false,
  label: 'label',
  message: 'message',
  required: false,
  remark: 'remark',
  severity: undefined,
  showRemarkIcon: false,
};

Playground.argTypes = {
  severity: {
    control: {
      type: 'select',
      options: [
        undefined,
        ...severities,
      ],
    },
  },
};
