import { Meta, Story } from '@storybook/react';
import { Sizes as sizeOptions } from '../../system/typings';
import { PlusIcon, SearchIcon } from '../Icon/src';
import Icon from '../Icon/Icon';
import Input, { InputProps } from './Input';

export default {
  title: 'Data Entry/Input',
} as Meta;

export const Playground: Story<InputProps> = (props) => (
  <Input {...props} />
)

Playground.args = {
  readOnly: false,
  error: false,
  required: false,
};

Playground.argTypes = {
  defaultValue: {
    description: "預設值",
  },
  value: {
    description: 'Input 當前的值（通常會用 state 傳下去）',
  },
  inputRef: {
    description: "在使用時可透過 useRef 取得 input ref",
  },
  inputProp: {
    description: "Input Element 原生的 Props",
  },
  onChange: {
    description: "改變 Input 值的 Function（通常會用 setState 傳下去）",
  },
  placeholder: {
    description: "輸入框內沒輸入值時的灰底提示文字",
    controls: 'string',
  },
  readOnly: {
    description: "Input 為唯讀模式（純顯示不可操作）",
    controls: 'boolean',
  },
  required: {
    description: "Input 為必填",
    controls: 'boolean',
  },
  error: {
    description: "錯誤狀態",
    controls: 'boolean',
  },
  size: {
    description: '輸入框的大小',
    control: {
      type: 'select',
      defaultValue: 'medium',
      options: sizeOptions,
    },
  },
}

export const Basic = () => (
  <div
    style={{
      display: 'inline-grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      alignItems: 'center',
    }}
  >
    <Input
      placeholder="please enter text"
    />
    <Input
      placeholder="please enter text"
      disabled
    />
    <Input
      placeholder="please enter text"
      error
    />
    <Input
      placeholder="please enter text"
      value="Read Only"
      readOnly
    />
  </div>
);

export const Sizes = () => (
  <div
    style={{
      display: 'inline-grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      alignItems: 'center',
    }}
  >
    <Input
      placeholder="please enter text"
      size="small"
    />
    <Input
      placeholder="please enter text"
      size="medium"
    />
    <Input
      placeholder="please enter text"
      size="large"
    />
    <Input
      placeholder="please enter text"
      size="small"
      disabled
    />
    <Input
      placeholder="please enter text"
      size="medium"
      disabled
    />
    <Input
      placeholder="please enter text"
      size="large"
      disabled
    />
    <Input
      placeholder="please enter text"
      size="small"
      error
    />
    <Input
      placeholder="please enter text"
      size="medium"
      error
    />
    <Input
      placeholder="please enter text"
      size="large"
      error
    />
  </div>
);

export const PrefixSuffix = () => (
  <div
    style={{
      display: 'inline-grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      alignItems: 'center',
    }}
  >
    <Input
      placeholder="please enter text"
      prefix={<Icon icon={PlusIcon} />}
    />
    <Input
      placeholder="please enter text"
      suffix={<Icon icon={PlusIcon} />}
    />
    <Input
      placeholder="please enter text"
      suffix={<Icon icon={PlusIcon} />}
      disabled
    />
    <Input
      placeholder="search"
      prefix={<Icon icon={SearchIcon} />}
      size="small"
    />
    <Input
      placeholder="search"
      prefix={<Icon icon={SearchIcon} />}
    />
    <Input
      placeholder="search"
      prefix={<Icon icon={SearchIcon} />}
      size="large"
    />
    <Input
      placeholder="search"
      prefix={<Icon icon={SearchIcon} />}
    />
    <Input
      placeholder="please enter text"
      prefix={<Icon icon={PlusIcon} />}
      error
    />
  </div>
);
