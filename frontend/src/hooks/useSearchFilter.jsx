import { useState } from 'react';

export default function useSearchFilter(items, field) {
  const [searchTerm, setSearchTerm] = useState('');
  const fields = Array.isArray(field) ? field : [field];

  const filteredItems = items.filter((item) =>
    fields.some((itemField) =>
      String(item[itemField] ?? '')
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
    )
  );

  return { searchTerm, setSearchTerm, filteredItems };
}