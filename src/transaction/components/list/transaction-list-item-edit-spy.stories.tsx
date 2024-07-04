import type { StoryObj, Meta } from '@storybook/react';
import { TransactionListItemEditSpy } from './transaction-list-item-edit-spy.component';

const Config: Meta<typeof TransactionListItemEditSpy> = {
  component: TransactionListItemEditSpy,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

type Story = StoryObj<typeof TransactionListItemEditSpy>;

const Default: Story = {
  args: {
    children: <div>awdawdawd</div>,
  },
};

export default Config;
export { Default };
