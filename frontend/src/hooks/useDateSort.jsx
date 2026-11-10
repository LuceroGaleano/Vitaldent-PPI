import { useState } from 'react';

export default function useDateSort(items, dateField, timeField) {
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedItems = [...items].sort((first, second) => {
    const dateComparison = String(first[dateField]).localeCompare(String(second[dateField]));
    const comparison = dateComparison
      || String(first[timeField]).localeCompare(String(second[timeField]));

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return { sortOrder, setSortOrder, sortedItems };
}
