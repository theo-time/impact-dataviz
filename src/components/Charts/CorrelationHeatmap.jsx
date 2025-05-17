import React from 'react';
import Plot from 'react-plotly.js';

export default function CorrelationHeatmap({ data }) {
  const xLabels = [...new Set(data.map(d => d.x))];
  const yLabels = [...new Set(data.map(d => d.y))];

  const zMatrix = yLabels.map(y =>
    xLabels.map(x => {
      const found = data.find(d => d.x === x && d.y === y);
      return found ? found.value : null;
    })
  );

  const getTextColor = (value, x, y) => {
    if (x === y) return '#cccccc'; // gris clair pour x === y
    return Math.abs(value) > 0.5 ? '#bbbbbb' : '#000000';
  };

  const textMatrix = yLabels.map((y, i) =>
    xLabels.map((x, j) => {
      const val = zMatrix[i][j];
      return x === y ? '' : (val !== null ? val.toFixed(2) : '');
    })
  );

  const textColorMatrix = yLabels.map((y, i) =>
    xLabels.map((x, j) => {
      const val = zMatrix[i][j];
      return getTextColor(val, x, y);
    })
  );

  return (
    <Plot
      data={[
        {
          z: zMatrix,
          x: xLabels,
          y: yLabels,
          type: 'heatmap',
          colorscale: 'RdBu',
          reversescale: true,
          zmin: -1,
          zmax: 1,
          hoverongaps: false,
          showscale: true,
          text: textMatrix,
          texttemplate: '%{text}',
          textfont: {
            size: 12,
            color: textColorMatrix,
          },
          colorbar: {
            tickfont: { size: 14 },
            title: {
              text: 'Corrélation',
              font: { size: 16 },
            },
          },
        },
      ]}
      layout={{
        title: 'Corrélations entre catégories d’impact',
        height: 1000,
        width: 1000,
        margin: { t: 60, l: 120, r: 60, b: 120 },
        xaxis: {
          tickangle: -45,
          automargin: true,
        },
        yaxis: {
          automargin: true,
        },
      }}
      config={{ responsive: true }}
    />
  );
}
