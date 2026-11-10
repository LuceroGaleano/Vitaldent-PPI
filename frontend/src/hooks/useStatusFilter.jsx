import { useState } from 'react';

export default function useStatusFilter(items, field) {
  const [filterValue, setFilterValue] = useState('');

  const filteredItems = items.filter(
    (item) => filterValue === '' || String(item[field]) === filterValue
  );

  return { filterValue, setFilterValue, filteredItems };
}
