import type { FC, PropsWithChildren, ReactNode } from 'react';

type CollapseProps = PropsWithChildren<{
  title: string | ReactNode;
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
export type { CollapseProps };
