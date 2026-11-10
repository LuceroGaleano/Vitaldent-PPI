import { useState } from 'react';

export default function useSearchFilter(items, field) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter((item) =>
      String(item[field] ?? '')
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
  );

  return { searchTerm, setSearchTerm, filteredItems };
}