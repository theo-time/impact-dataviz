import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack
} from '@mui/material';
import Plot from 'react-plotly.js';
import CategoryNavigator from './CategoryNavigator.jsx';

import './ComparativePlot.css';
import BarChart from './Charts/BarChart.jsx';
import StackedBarChart from './Charts/StackedBarChart.jsx';

export default function ComparativePlot({ data, selectedNode, setSelectedNode }) {
  const [category, setCategory] = useState('Acidification');
  const [xScale, setXScale] = useState('log');

  const toggleScale = () => {
    setXScale(prev => (prev === 'log' ? 'linear' : 'log'));
  };

  const categoryOptions = useMemo(() => {
    const set = new Set();
    data.forEach(d => {
      if (d.category_name) set.add(d.category_name.trim());
    });
    return Array.from(set);
  }, [data]);

  const filtered = useMemo(() => {
    if (!selectedNode?.path || !category) return [];
    const { path, level } = selectedNode;

    return data.filter(row =>
      path[0] === row.Categorie_niv_1 &&
      (level < 1 || path[1] === row.Categorie_niv_2) &&
      (level < 2 || path[2] === row.Categorie_niv_3) &&
      (level < 3 || path[3] === row.Categorie_niv_4)
      // && row.category_name?.trim() === category
    );
  }, [data, selectedNode, category]);



  return (
    <Box sx={{ mt: 4 }}>
      <CategoryNavigator selectedNode={selectedNode} setSelectedNode={setSelectedNode} />

      <Typography variant="h6" gutterBottom>
        Comparatif des impacts environnementaux
      </Typography>

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
      <Button variant="outlined" onClick={toggleScale}>
        {xScale === 'log' ? 'Echelle logarithmique' : 'Echelle linéaire'}
      </Button>
      {/* <BarChart data={filtered} xScale={xScale} />
       */}
      <StackedBarChart data={filtered} xScale={xScale} />
    </Box>
  );
}
