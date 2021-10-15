import { Story, Meta } from '@storybook/react';
import { Sizes } from '../../system/typings';
import TextField, { TextFieldProps } from './TextField';

export default {
  title: 'Data Entry/TextField',
} as Meta;

export const Basic: Story<TextFieldProps> = (props) => (
  <TextField {...props}>
    Input Here
  </TextField>
);

Basic.args = {
  disabled: false,
  error: false,
  fullWidth: false,
}

Basic.argTypes = {
  children: {
    description: "TextField 裡面要包的表單元件，像是 input or select",
  },
  prefix: {
    description: "輸入框前面的 icon",
    table: {
      type: {
        summary: "IconDefinition",
      },
    },
  },
  suffix: {
    description: "輸入框後面的 icon",
    table: {
      type: {
        summary: "IconDefinition",
      },
    },
  },
  disabled: {
    description: '使整個 TextField 無效',
    control: 'boolean',
  },
  error: {
    description: '錯誤狀態',
    control: 'boolean',
  },
  fullWidth: {
    description: '寬度 100%',
    control: 'boolean',
  },
  size: {
    description: '輸入框的大小',
    control: {
      type: 'select',
      options: Sizes,
    },
  },
}