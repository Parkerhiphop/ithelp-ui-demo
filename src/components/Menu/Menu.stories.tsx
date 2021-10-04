import { Meta } from '@storybook/react';
import Menu from './Menu';
import MenuItem from './MenuItem';


export default {
  title: 'Navigation/Menu',
} as Meta;

export const Sizes = () => (
  <div style={{
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(3, 160px)',
    gap: 60,
  }}
  >
    <Menu size="large">
      <MenuItem>item 1</MenuItem>
      <MenuItem active>item 2</MenuItem>
      <MenuItem disabled>item 3</MenuItem>
      <MenuItem>item 4</MenuItem>
    </Menu>
    <Menu size="medium">
      <MenuItem>item 1</MenuItem>
      <MenuItem active>item 2</MenuItem>
      <MenuItem disabled>item 3</MenuItem>
      <MenuItem>item 4</MenuItem>
    </Menu>
    <Menu size="small">
      <MenuItem>item 1</MenuItem>
      <MenuItem active>item 2</MenuItem>
      <MenuItem disabled>item 3</MenuItem>
      <MenuItem>item 4</MenuItem>
    </Menu>
  </div>
);

/**
 * @todo
 * WithDivider
 * Group
 */