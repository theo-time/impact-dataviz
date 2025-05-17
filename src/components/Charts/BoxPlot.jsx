import React from 'react';
import Plot from 'react-plotly.js';

export default function BoxPlot({ data }) {
  if (!data || data.length === 0) return null;

  // Nettoyage
  const values = data
    .map(d => Number(d.valeur))
    .filter(v => !isNaN(v) && isFinite(v) && v > 0); // supprime les valeurs nulles ou absurdes

  const labels = data.map(d => d['Nom du flux']?.trim() || '');
  const unit = data[0]['Unité de référence']?.trim() || 'Valeur';
  console.log(unit)
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
          marker: { color: '#007acc', size: 5 },
          line: { color: '#007acc' },
          fillcolor: 'rgba(0,122,204,0.1)',
          hovertext: labels,
          hoverinfo: 'y+text',
          name: 'Distribution'
        }
      ]}
      layout={{
        title: 'Répartition des valeurs d’impact',
        margin: { t: 40, r: 30, l: 60, b: 40 },
        yaxis: {
          title: { text: unit },
          type: 'log',
          zeroline: false,
          gridcolor: '#eee'
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
      style={{ width: '100%', height: '400px' }}
    />
  );
}
