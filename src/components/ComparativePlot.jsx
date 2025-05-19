import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import Plot from 'react-plotly.js';
import CategoryNavigator from './CategoryNavigator.jsx';

import './ComparativePlot.css';

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
      (level < 3 || path[3] === row.Categorie_niv_4) &&
      row.category_name?.trim() === category
    );
  }, [data, selectedNode, category]);

  const sortedData = useMemo(() => {
    return [...filtered].sort((a, b) => a.valeur - b.valeur); // tri croissant
  }, [filtered]);

  const labels = sortedData.map(d => d["Nom du flux"]);
  const values = sortedData.map(d => d.valeur);
  const tooltips = sortedData.map(d => {
    const nom = d["Nom du flux"]?.trim() ?? '';
    const valeur = d.valeur?.toLocaleString('fr-FR', { maximumSignificantDigits: 3 }) ?? '';
    const uniteRef = d["Unité de référence"]?.trim() ?? '';
    const qte = d["Quantité de référence"]?.trim() ?? '';
    const unite = d["Unité"]?.trim() ?? '';

    return `
    <span style="font-size: 13px; color: black;">
      ${nom}<br />
      <span style="color:#007acc; font-size: 16px; font-weight: bold;">
        ${valeur} ${uniteRef} par ${qte} ${unite}
      </span>
    </span>
  `;
  });



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

      {sortedData.length === 0 ? (
        <Typography variant="body2">Aucune donnée disponible.</Typography>
      ) : (
        <Plot
          data={[
            {
              type: 'bar',
              x: values,
              y: labels,
              text: tooltips,
              hoverinfo: 'text',
              hovertemplate: '%{text}<extra></extra>',
              orientation: 'h',
              marker: { color: '#007acc' },
              textposition: 'none'
            }
          ]}
          layout={{
            margin: { l: 300, r: 40, t: 40, b: 40 },
            xaxis: {
              title: 'Valeur (échelle logarithmique)',
              type: xScale,
              side: 'top',
              tickfont: { size: 12 },
            },
            yaxis: {
              tickfont: { size: 12 },
              domain: [0.4, 1],
              automargin: false
            },
            height: sortedData.length * 30 + 100,
            showlegend: false,
            hovermode: 'closest',
            hoverlabel: {
              bgcolor: 'white',
              bordercolor: 'black',
              font: {
                color: 'black',
                size: 12
              }
            }
          }}
          config={{ responsive: true }}
          style={{ width: '100%' }}
        />

      )}
    </Box>
  );
}
