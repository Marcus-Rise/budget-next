import type { Meta, StoryObj } from '@storybook/react';
import { SwipeX } from './swipe-x.component';

const Config: Meta<typeof SwipeX> = {
  component: SwipeX,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

type Story = StoryObj<typeof SwipeX>;

const Default: Story = {
  args: {
    children: <span>awdawd</span>,
    right: (
      <div className={'flex h-full'}>
        <button className={'bg-primary border-none p-2'} onClick={() => alert('copy')}>
          Скопировать
        </button>
        <button className={'bg-danger border-none p-2'} onClick={() => alert('delete')}>
          Удалить
        </button>
      </div>
    ),
  },
};

export default Config;
export { Default };
