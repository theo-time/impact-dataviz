import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  Tabs,
  Tab,
  Switch,
  FormControlLabel
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

  const handleChartTypeChange = (event, newValue) => {
    setChartType(newValue);
    if (newValue !== 'bar') {
      setXScale('linear');
    }
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
        !positiveMode ?
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
        grouped[key] = { total: 0, total_norm: 0, count: 0, unit: row["Unité de référence"], impact_unit: row['Unité'], category: row.category_name };
      }

      // Si l'unité  est différente, on set l'unité de référence à ""
      if (grouped[key].impact_unit !== row["Unité"]) {
        grouped[key].impact_unit = "procédé";
      }

      grouped[key].total += row.valeur;
      grouped[key].total_norm += row.valeur_norm_q3;
      grouped[key].count += 1;
    }
    );


    // Construire les objets formatés comme des "faux procédés"
    const final = Object.entries(grouped).map(([key, { total, count, unit, category, impact_unit }]) => ({
      "Nom du flux": key.split(' - ')[0],
      "valeur": total / count,
      "valeur_norm_q3": total / count,
      "Unité de référence": unit,
      "Quantité de référence": "1", // valeur neutre
      "Unité": impact_unit,
      "category_name": category
    }));
    console.log('final', final);
    return final;
  }, [filtered, groupedMode, selectedNode, category]);


  return (
    <Box sx={{ mt: 4 }}>
      <CategoryNavigator selectedNode={selectedNode} setSelectedNode={setSelectedNode} />


      <Tabs
        value={chartType}
        onChange={(e, val) => handleChartTypeChange(e, val)}
        sx={{ mb: 2 }}
      >
        <Tab label="Impact unique" value="bar" />
        <Tab label="Multi-impact" value="stacked" />
        <Tab label="Heatmap" value="heatmap" />
      </Tabs>
      <div style={{ padding: '2rem' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2, flexWrap: 'wrap' }}
        >
          {/* Sélecteur à gauche */}
          {
            chartType === 'bar' ?
              <TextField
                select
                label="Catégorie d’impact"
                value={category}
                onChange={e => setCategory(e.target.value)}
                size="medium"
                sx={{ width: 400 }}
                disabled={chartType !== 'bar'}
              >
                {categoryOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
              :
              <div style={{ height: '56px' }}></div>
          }

          {/* Switchs à droite */}
          <Stack direction="row" spacing={2} alignItems="center" >
            <FormControlLabel
              control={
                <Switch
                  checked={!groupedMode}
                  onChange={toggleGroupedMode}
                  size="small"
                />
              }
              label={<Typography variant="body2">Détail Procédés</Typography>}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={xScale === 'log'}
                  onChange={toggleScale}
                  size="small"
                  disabled={chartType !== 'bar'}
                />
              }
              label={<Typography variant="body2">Échelle logarithmique</Typography>}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={positiveMode}
                  onChange={() => setPositiveMode(prev => !prev)}
                  size="small"
                />
              }
              label={<Typography variant="body2">Valeurs négatives</Typography>}
            />
          </Stack>
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
      </div>
    </Box>
  );
}
