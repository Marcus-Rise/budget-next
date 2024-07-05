import type { StoryObj, Meta } from '@storybook/react';
import { Button } from './button.component';

const Config: Meta<typeof Button> = {
  component: Button,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

type Story = StoryObj<typeof Button>;

const Default: Story = {
  args: {
    children: <>text</>,
  },
};

export default Config;
export { Default };
