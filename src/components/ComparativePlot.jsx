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

export default function ComparativePlot({ data, selectedNode }) {
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

    console.log(level, label);
    console.log(path);
    // console.log(data[1])

    return data.filter(row => {

      return (
        (path.categorie_niv_1 === row.Categorie_niv_1) &&
        (level < 1 || path.categorie_niv_2 === row.Categorie_niv_2) &&
        (level < 2 || path.categorie_niv_3 === row.Categorie_niv_3) &&
        (level < 3 || path.categorie_niv_4 === row.Categorie_niv_4) &&
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
        <ResponsiveContainer width="100%" height={sortedData.length * 40}>
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
            <Tooltip />
            <Bar dataKey="valeur" fill="#007acc">
              <LabelList dataKey="valeur" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}
