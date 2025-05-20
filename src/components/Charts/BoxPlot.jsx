import React, { useState } from 'react';
import Plot from 'react-plotly.js';

export default function BoxPlot({ data, useLogScale, color }) {

  function wrapLabel(text, maxLineLength = 40) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length <= maxLineLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines.join('<br>');
  }

  // If the chart is in linear scale, remove the outliers (10 biggest and 10 smallest)
  if (!useLogScale) {
    const sortedData = [...data].sort((a, b) => a.valeur - b.valeur);
    data = sortedData.slice(30, -30)
  }

  if (!data || data.length === 0) return null;

  const values = data.map(d => d.valeur);
  const labels = data.map(d => d['Nom du flux']?.trim() || '');
  const unit = data[0]?.['Unité de référence']?.trim() || 'Valeur';

  return (

    <Plot
      data={[
        {
          type: 'box',
          y: values,
          x: Array(values.length).fill(''),
          boxpoints: 'all',
          jitter: 0.6,
          pointpos: 0,
          marker: { color: color, size: 5 },
          line: { color: '#007acc' },
          fillcolor: 'rgba(0,122,204,0.1)',
          hovertext: labels.map(label => wrapLabel(label)),
          hoverinfo: 'y+text',
          name: 'Distribution'
        }
      ]}
      layout={{
        title: 'Répartition des valeurs d’impact',
        margin: { t: 40, r: 30, l: 60, b: 40 },
        yaxis: {
          title: { text: unit },
          type: useLogScale ? 'log' : 'linear',
          zeroline: false,
          gridcolor: '#eee',
          autorange: true
        },
        xaxis: {
          showticklabels: false,
          showgrid: false
        },
        plot_bgcolor: '#fff',
        paper_bgcolor: '#fff',
        showlegend: false
      }}
      config={{
        responsive: true,
        displayModeBar: false
      }}
      style={{ width: '100%', height: '370px' }}
    />
  );
}
