import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import Pagination, { PaginationProps } from './Pagination';

export default {
  title: 'Navigation/Pagination',
} as Meta;

export const Playground: Story<PaginationProps> = ({
  boundaryCount,
  buttonText,
  disabled,
  hideNextButton,
  hidePreviousButton,
  hintText,
  inputPlaceholder,
  pageSize,
  showJumper,
  siblingCount,
  total = 20,
}) => {
  const [current, onPageChange] = useState(1);

  return (
    <Pagination
      current={current}
      onPageChange={onPageChange}
      total={total}
    />
  );
};
