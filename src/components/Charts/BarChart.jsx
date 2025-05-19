
import React, { useMemo } from 'react'
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import Plot from 'react-plotly.js';
import impactColors from '../../configs/colorCode.js';

export default function BarChart({ data, xScale }) {

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.valeur - b.valeur); // tri croissant
  }, [data]);

  const category = sortedData[0]?.category_name?.trim() ?? '';


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

  if (sortedData.length === 0) {
    return (
      <Typography variant="body2">Aucune donnée disponible.</Typography>
    )
  }

  return (
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
          marker: {
            color: impactColors[category] ?? '#999',
            line: { width: 0.5, color: '#333' }
          },
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
        height: sortedData.length * 40 + 100,
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
  )
}
