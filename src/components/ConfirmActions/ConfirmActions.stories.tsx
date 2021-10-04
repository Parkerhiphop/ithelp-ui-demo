import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';
import { Size } from '../../system/typings';
import ConfirmActions, { ConfirmActionsProps } from './ConfirmActions';

export default {
  title: 'Feedback/ConfirmActions',
} as Meta;

const sizes: Size[] = [
  'small',
  'medium',
  'large',
];

type PlaygroundStoryArgs = ConfirmActionsProps;

export const Playground: Story<PlaygroundStoryArgs> = ({
  cancelText,
  confirmText,
  error,
  loading,
  onCancel,
  onConfirm,
  size,
}) => (
  <ConfirmActions
    cancelText={cancelText}
    confirmText={confirmText}
    error={error}
    loading={loading}
    onCancel={onCancel}
    onConfirm={onConfirm}
    size={size}
  />
);

Playground.args = {
  cancelText: 'cancel',
  confirmText: 'ok',
  error: false,
  loading: false,
  onCancel: action('onCancel'),
  onConfirm: action('onConfirm'),
  size: 'medium',
};

Playground.argTypes = {
  size: {
    control: {
      type: 'select',
      options: sizes,
    },
  },
};
