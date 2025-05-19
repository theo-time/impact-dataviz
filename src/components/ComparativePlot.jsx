import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  Tabs,
  Tab
} from '@mui/material';
import CategoryNavigator from './CategoryNavigator.jsx';

import './ComparativePlot.css';
import BarChart from './Charts/BarChart.jsx';
import StackedBarChart from './Charts/StackedBarChart.jsx';

export default function ComparativePlot({ data, selectedNode, setSelectedNode }) {
  const [category, setCategory] = useState('Acidification');
  const [xScale, setXScale] = useState('log');
  const [chartType, setChartType] = useState('bar'); // 'bar' | 'stacked' | 'heatmap'

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

      <Tabs
        value={chartType}
        onChange={(e, val) => setChartType(val)}
        sx={{ mb: 2 }}
      >
        <Tab label="Bar Chart" value="bar" />
        <Tab label="Stacked Bar Chart" value="stacked" />
        <Tab label="Heatmap" value="heatmap" />
      </Tabs>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          select
          label="Catégorie d’impact"
          value={category}
          onChange={e => setCategory(e.target.value)}
          size="small"
        >
          {categoryOptions.map(opt => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="outlined" onClick={toggleScale}>
          {xScale === 'log' ? 'Échelle logarithmique' : 'Échelle linéaire'}
        </Button>
      </Stack>

      {chartType === 'bar' && (
        <BarChart data={filtered.filter(d => d.category_name?.trim() === category)} xScale={xScale} />
      )}
      {chartType === 'stacked' && (
        <StackedBarChart data={filtered} xScale={xScale} />
      )}
      {chartType === 'heatmap' && (
        <Box sx={{ p: 4 }}>
          <Typography variant="body1">📊 La heatmap sera bientôt disponible.</Typography>
        </Box>
      )}
    </Box>
  );
}
