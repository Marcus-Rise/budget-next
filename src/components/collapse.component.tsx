import type { FC, PropsWithChildren } from 'react';

type CollapseProps = PropsWithChildren<{
  title: string;
  className?: string;
}>;

const Collapse: FC<CollapseProps> = ({ title, className, children }) => {
  return (
    <details className={className}>
      <summary>{title}</summary>
      {children}
    </details>
  );
};

export { Collapse };
