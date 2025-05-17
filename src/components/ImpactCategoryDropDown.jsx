import React, { useMemo } from 'react';
import { TextField, MenuItem } from '@mui/material';

export default function ImpactCategoryDropDown({ data, category, setCategory }) {
  const categoryOptions = useMemo(() => {
    const set = new Set();
    data.forEach(d => {
      if (d.category_name) set.add(d.category_name.trim());
    });
    return Array.from(set);
  }, [data]);

  return (
    <TextField
      select
      label="Catégorie d’impact"
      value={category}
      onChange={e => setCategory(e.target.value)}
      size="small"
      sx={{ mb: 2 }}
    >
      {categoryOptions.map(opt => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </TextField>
  );
}
