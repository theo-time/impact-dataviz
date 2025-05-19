import React, { useMemo } from 'react';
import { Typography } from '@mui/material';
import Plot from 'react-plotly.js';

export default function StackedBarChart({ data, xScale }) {
  const groupedData = useMemo(() => {
    // Étape 1 : regrouper les données par flux
    const fluxMap = new Map();

    for (const row of data) {
      const nom = row["Nom du flux"]?.trim();
      const valeur = row['valeur_norm_q3'] ?? 0;

      if (!nom) continue;

      if (!fluxMap.has(nom)) {
        fluxMap.set(nom, []);
      }
      fluxMap.get(nom).push(valeur);
    }

    // Étape 2 : calculer la somme par flux
    const fluxWithSums = Array.from(fluxMap.entries()).map(([nom, valeurs]) => ({
      nom,
      somme: valeurs.reduce((acc, val) => acc + val, 0)
    }));

    // Étape 3 : trier les flux par somme décroissante
    const sortedFlux = fluxWithSums
      .sort((a, b) => b.somme - a.somme)
      .map(entry => entry.nom);

    // Étape 4 : liste des catégories
    const allCategories = [...new Set(data.map(d => d.category_name?.trim() ?? ''))];

    // Étape 5 : créer les traces par catégorie, dans l'ordre trié des flux
    const categoryTraces = allCategories.map(category => {
      const values = sortedFlux.map(name => {
        const row = data.find(d =>
          d["Nom du flux"]?.trim() === name &&
          d.category_name?.trim() === category
        );
        return row?.valeur_norm_q3 ?? 0;
      });

      return {
        type: 'bar',
        name: category,
        x: values,
        y: sortedFlux.map(name => wrapLabel(name)),
        orientation: 'h',
        hoverinfo: 'x+y+name',
        marker: { line: { width: 0.5, color: '#333' } }
      };
    });

    return { traces: categoryTraces, labels: sortedFlux };
  }, [data]);


  if (data.length === 0) {
    return <Typography variant="body2">Aucune donnée disponible.</Typography>;
  }

  return (
    <Plot
      data={groupedData.traces}
      layout={{
        barmode: 'stack',
        margin: { l: 300, r: 40, t: 40, b: 40 },
        xaxis: {
          title: `Valeur (${xScale === 'log' ? 'logarithmique' : 'linéaire'})`,
          type: xScale,
          side: 'top',
          tickfont: { size: 12 },
          tickmode: xScale === 'log' ? 'array' : 'auto',
          tickvals: xScale === 'log' ? [1e-9, 1e-6, 1e-3, 1, 1e3, 1e6, 1e9] : undefined,
          ticktext: xScale === 'log' ? ['1 n', '1 µ', '1 m', '1', '1 k', '1 M', '1 G'] : undefined
        },
        yaxis: {
          tickfont: { size: 12 },
          domain: [0.3, 1],
          automargin: false
        },
        height: groupedData.labels.length * 40 + 100,
        showlegend: true,
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
  );
}

// Simple word wrapping for Y-axis labels
function wrapLabel(label, maxLength = 30) {
  if (!label) return '';
  const words = label.split(/\s+/);
  let line = '';
  const lines = [];

  words.forEach(word => {
    if ((line + ' ' + word).trim().length > maxLength) {
      lines.push(line.trim());
      line = word;
    } else {
      line += ' ' + word;
    }
  });

  if (line) lines.push(line.trim());
  return lines.join('\n');
}
