import Card from "@components/card";
import NoResultState from "@components/noResultState";
import EmptyState from "@components/emptyState";
import { memo, useDeferredValue } from "react";
import { MatchRecord } from '@services/MatchHistoryService'

interface ListProps {
  items: MatchRecord[];
  searchTerm: string;
  errorMessage?: string;
}
function List({ items = [], searchTerm = "", errorMessage }: ListProps) {
  const deferredList = useDeferredValue<ListProps['items']>(items);
  if (deferredList.length === 0 && searchTerm === "")
    return <EmptyState errorMessage={errorMessage} />;
  if (deferredList.length === 0 && searchTerm !== "" && errorMessage)
    return <NoResultState errorMessage={errorMessage} />;
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {deferredList.map((item) => (
          <Card key={item.gameInfo.gameId} data={item} />
        ))}
      </ul>
    </div>
  );
}

export default memo(List);
