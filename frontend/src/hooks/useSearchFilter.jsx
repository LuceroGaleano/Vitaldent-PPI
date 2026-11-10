import { useState } from 'react';

export default function useSearchFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const filterBySearch = (items, field) =>
    items.filter((item) =>
      String(item[field] ?? '')
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
    );

  const filterByStatus = (items, field) =>
    items.filter(
      (item) => filterValue === '' || String(item[field]) === filterValue
    );

  return {
    searchTerm,
    setSearchTerm,
    filterValue,
    setFilterValue,
    filterBySearch,
    filterByStatus,
  };
}