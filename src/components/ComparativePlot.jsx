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
  const [xScale, setXScale] = useState('linear');
  const [chartType, setChartType] = useState('bar'); // 'bar' | 'stacked' | 'heatmap'
  const [groupedMode, setGroupedMode] = useState(true);
  const [positiveMode, setPositiveMode] = useState(false);

  const toggleGroupedMode = () => {
    // Si on est à la racine, on ne peut que grouper
    if (selectedNode.level === -1) {
      setGroupedMode(true);
      return;
    }
    setGroupedMode(prev => !prev);
  };

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
    if (!category) return [];
    const { path, level } = selectedNode;
    console.log('data', data)
    return data.filter(row =>
      (
        level === -1 ||
        (
          (path[0] === row.Categorie_niv_1) &&
          (level < 1 || path[1] === row.Categorie_niv_2) &&
          (level < 2 || path[2] === row.Categorie_niv_3) &&
          (level < 3 || path[3] === row.Categorie_niv_4)
        )
      )
      && (
        positiveMode ?
          row.valeur >= 0
          : row.valeur < 0
      )
    );
  }, [data, selectedNode, category, positiveMode]);

  const filteredFinal = useMemo(() => {
    console.log('filtered', filtered);
    // Si on n'est pas en mode "groupé", on retourne les données filtrées
    if (!groupedMode) return filtered;

    // Si on est à la dernière branche on ne peut pas grouper et on affiche les procédés
    if (selectedNode.level >= 3 || selectedNode.isLastBranch) return filtered;

    // Niveau à grouper (ex : si on est à niv_2, on groupe par niv_3)
    const groupKey1 = `Categorie_niv_${selectedNode.level + 2}`;
    const groupKey2 = `category_name`;
    console.log('selectedNode', selectedNode);

    // Grouper les éléments par sous-catégorie
    const grouped = {};

    filtered.forEach(row => {
      const key1 = row[groupKey1];
      const key2 = row[groupKey2];
      const key = `${key1} - ${key2}`;
      if (!key) return;

      if (!grouped[key]) {
        grouped[key] = { total: 0, total_norm: 0, count: 0, unit: row["Unité de référence"], category: row.category_name };
      }

      grouped[key].total += row.valeur;
      grouped[key].total_norm += row.valeur_norm_q3;
      grouped[key].count += 1;
    }
    );


    // Construire les objets formatés comme des "faux procédés"
    const final = Object.entries(grouped).map(([key, { total, count, unit, category }]) => ({
      "Nom du flux": key.split(' - ')[0],
      "valeur": total / count,
      "valeur_norm_q3": total / count,
      "Unité de référence": unit,
      "Quantité de référence": "1", // valeur neutre
      "Unité": "", // facultatif
      "category_name": category
    }));
    console.log('final', final);
    return final;
  }, [filtered, groupedMode, selectedNode, category]);


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
        <Button variant="outlined" onClick={toggleGroupedMode}>
          {groupedMode ? 'Voir les procédés' : 'Voir les sous-catégories'}
        </Button>


        <Button variant="outlined" onClick={toggleScale}>
          {xScale === 'log' ? 'Échelle logarithmique' : 'Échelle linéaire'}
        </Button>

        <Button variant="outlined" onClick={() => setPositiveMode(prev => !prev)}>
          {positiveMode ? 'Afficher les valeurs positives' : 'Afficher les valeurs négatives'}
        </Button>
      </Stack>

      {chartType === 'bar' && (
        <BarChart data={filteredFinal.filter(d => d.category_name?.trim() === category)} xScale={xScale} />
      )}
      {chartType === 'stacked' && (
        <StackedBarChart data={filteredFinal} xScale={xScale} />
      )}
      {chartType === 'heatmap' && (
        <Box sx={{ p: 4 }}>
          <Typography variant="body1">📊 La heatmap sera bientôt disponible.</Typography>
        </Box>
      )}
    </Box>
  );
}
