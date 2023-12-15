import type { FC, PropsWithChildren, ReactElement } from 'react';
import {
  listDatedSortHelper,
  listDatedSortKeyToDateHelper,
} from '@/components/list-dated/list-dated-sort.helper';

type ListDatedBaseListItem = { date: Date };
type ListDatedItem<Object extends ListDatedBaseListItem = ListDatedBaseListItem> = Object;

type ListDatedWrapper = FC<PropsWithChildren>;
type ListDatedItemWrapper = FC<PropsWithChildren>;

type ListDatedProps<Object extends ListDatedItem> = {
  items: Array<Object>;
  children: (date: Date, items: Array<Object>) => ReactElement;
  renderWrapper?: ListDatedWrapper;
  renderItemWrapper?: ListDatedItemWrapper;
};

const ListDatedWrapperDefault: ListDatedWrapper = ({ children }) => <>{children}</>;
const ListDatedItemWrapperDefault: ListDatedItemWrapper = ({ children }) => <>{children}</>;

const ListDated = <Object extends ListDatedItem>({
  items,
  children,
  renderWrapper: RenderWrapper = ListDatedWrapperDefault,
  renderItemWrapper: RenderItemWrapper = ListDatedItemWrapperDefault,
}: ListDatedProps<Object>): ReactElement => {
  const dateGroups = listDatedSortHelper(items);
  const dates = Array.from(dateGroups.keys());

  const groups = dates.map((group) => {
    const date = listDatedSortKeyToDateHelper(group);

    const items = dateGroups.get(group) ?? [];

    return <RenderItemWrapper key={group}>{children(date, items)}</RenderItemWrapper>;
  });

  return <RenderWrapper>{groups}</RenderWrapper>;
};

export { ListDated };
export type { ListDatedItem };
