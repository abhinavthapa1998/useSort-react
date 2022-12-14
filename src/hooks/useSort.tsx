import { ChangeEvent, useEffect, useState } from "react";

import { compareObjectsByKey } from "../utils/utils";
import { SortDirection, ItemKey, SortOption } from "../types/types";

export interface SortProps<T> {
  data: T[];
  onSortChange(data: T[]): void;
  sortOptions: any[];
}

export function useSort<T>({ data, onSortChange, sortOptions }: SortProps<T>) {
  // Local state
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const initialSortKey = sortOptions[0].value as ItemKey<T>;
  const [sortKey, setSortKey] = useState<ItemKey<T>>(initialSortKey);

  // Execute the sort and callback when local state
  // or supplied props have changed.
  useEffect(() => {
    // Create a copy before sorting, as the original array is frozen in strict mode.
    const sortedData = [...data];
    if (sortedData?.length) {
      sortedData.sort(compareObjectsByKey(sortKey, sortDirection === "asc"));

      if (onSortChange) {
        onSortChange(sortedData);
      }
    }
  }, [data, onSortChange, sortDirection, sortKey]);

  /**
   * Handle changes to the sort key.
   * @param event: ChangeEvent<HTMLSelectElement>
   */
  const handleSortKeyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortKey = event.target.value as ItemKey<T>;
    if (sortKey !== newSortKey) {
      setSortKey(newSortKey);
    }
  };

  /**
   * Handle changes to the sort direction.
   */
  const handleDirectionToggle = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return {
    handleDirectionToggle,
    handleSortKeyChange,
    sortDirection,
    sortKey
  };
}
