import { Story, Meta } from '@storybook/react';
import TextField, { TextFieldProps } from './TextField';

export default {
  title: 'Data Entry/TextFields',
} as Meta;

export const Basic: Story<TextFieldProps> = (props) => (
  <TextField>
    Input Here
  </TextField>
);
