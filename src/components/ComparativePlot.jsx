import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem
} from '@mui/material';
import Plot from 'react-plotly.js';
import CategoryNavigator from './CategoryNavigator.jsx';

export default function ComparativePlot({ data, selectedNode, setSelectedNode }) {
  const [category, setCategory] = useState('Acidification');

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
    return `${nom}<br><b>${valeur} ${uniteRef} par ${qte} ${unite}</b>`;
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
              orientation: 'h',
              hoverinfo: 'text',
              marker: {
                color: '#007acc',
              }
            }
          ]}
          layout={{
            margin: { l: 300, r: 40, t: 40, b: 40 },
            xaxis: {
              title: 'Valeur (échelle logarithmique)',
              type: 'log',
              side: 'top',
              tickfont: { size: 12 }
            },
            yaxis: {
              automargin: true,
              tickfont: { size: 12 }
            },
            height: sortedData.length * 45 + 80,
            showlegend: false
          }}
          config={{ responsive: true }}
          style={{ width: '100%' }}
        />
      )}
    </Box>
  );
}
