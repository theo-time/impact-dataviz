import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer
} from 'recharts';
import CategoryNavigator from './CategoryNavigator.jsx';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;

    const nom = data["Nom du flux"]?.trim() ?? '';
    const valeur = data.valeur?.toLocaleString('fr-FR', { maximumSignificantDigits: 3 }) ?? '';
    const uniteRef = data["Unité de référence"]?.trim() ?? '';
    const qte = data["Quantité de référence"]?.trim() ?? '';
    const unite = data["Unité"]?.trim() ?? '';

    return (
      <Box
        sx={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '0.75rem',
          fontSize: '0.875rem',
          maxWidth: 280,
          wordWrap: 'break-word',
        }}
      >
        {nom}
        <strong style={{ display: 'block', marginBottom: '0.25rem', marginTop: '0.25rem', fontSize: '1rem' }}>{`${valeur} ${uniteRef} par ${qte} ${unite}`}</strong>

      </Box>
    );
  }

  return null;
};



export default function ComparativePlot({ data, selectedNode, setSelectedNode }) {
  const [category, setCategory] = useState('Acidification'); // default category

  // Liste unique des catégories d'impact (category_name)
  const categoryOptions = useMemo(() => {
    const set = new Set();
    data.forEach(d => {
      if (d.category_name) set.add(d.category_name.trim());
    });
    return Array.from(set);
  }, [data]);

  // Filtrage des données selon le niveau sélectionné (selectedNode)
  const filtered = useMemo(() => {
    if (!selectedNode?.path || !category) return [];
    const { path, level, label } = selectedNode;

    return data.filter(row => {

      return (
        (path[0] === row.Categorie_niv_1) &&
        (level < 1 || path[1] === row.Categorie_niv_2) &&
        (level < 2 || path[2] === row.Categorie_niv_3) &&
        (level < 3 || path[3] === row.Categorie_niv_4) &&
        row.category_name?.trim() === category
      )
    });
  }, [data, selectedNode, category]);

  // Tri décroissant
  const sortedData = [...filtered].sort((a, b) => b.valeur - a.valeur);

  const formatLabel = (label) => {
    const words = label.split(/[\s/|-]/g);
    const lines = [];

    let currentLine = words[0] || '';
    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i];
      if (testLine.length <= 100) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
        if (lines.length === 1) break; // max 2 lines
      }
    }
    lines.push(currentLine);
    return lines.join('\n');
  };

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
        <Box sx={{ width: '100%', height: sortedData.length * 45 + 40 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={sortedData}
              margin={{ top: 10, right: 40, left: 150, bottom: 10 }}
              barCategoryGap="15%"
            >
              <XAxis
                type="number"
                orientation="top"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="Nom du flux"
                width={300}
                interval={0}
                tickFormatter={formatLabel}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valeur" fill="#007acc">
                <LabelList dataKey="valeur" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
}
