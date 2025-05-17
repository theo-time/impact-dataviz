import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

export default function ProcedeSelector({ procedeMetadata, setSelectedProcede }) {
  const [search, setSearch] = useState('');

  // éviter le recalcul à chaque re-render
  const filteredProcede = useMemo(() => {
    const lower = search.toLowerCase();

    return procedeMetadata.filter(p =>
      p['Nom du flux']?.toLowerCase().includes(lower)
      || p['UUID'].includes(search)
    );
  }, [search, procedeMetadata]);

  return (
    <Box sx={{ minHeight: 400, minWidth: 300 }}>

      <TextField
        fullWidth
        size="small"
        placeholder="Rechercher un procédé..."
        value={search}
        onChange={(e) => { setSearch(e.target.value) }}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <SimpleTreeView>
        {filteredProcede.slice(0, 50).map((procede, index) => (
          <TreeItem
            key={procede['UUID'] || index}
            itemId={procede['UUID']}
            label={procede['Nom du flux']}
            onClick={() => setSelectedProcede(procede['Nom du flux'])}
          />
        ))}
      </SimpleTreeView>
    </Box>
  );
}
