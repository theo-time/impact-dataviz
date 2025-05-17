import React from 'react';
import Plot from 'react-plotly.js';

export default function CorrelationHeatmap({ data }) {
  const xLabels = [...new Set(data.map(d => d.x))];
  const yLabels = [...new Set(data.map(d => d.y))];

  const n = xLabels.length;
  const zMatrix = yLabels.map(y =>
    xLabels.map(x => {
      const found = data.find(d => d.x === x && d.y === y);
      return found ? found.value : null;
    })
  );


  const getTextColor = (value, x, y) => {
    if (x === y) return '#333'; // sombre sur fond gris
    return Math.abs(value) > 0.5 ? '#eeeeee' : '#000000';
  };

  const textMatrix = yLabels.map((y, i) =>
    xLabels.map((x, j) => {
      const val = zMatrix[i][j];
      return x === y ? '' : (val !== null ? val.toFixed(2) : '');
    })
  );

  const textColorMatrix = yLabels.map((y, i) =>
    xLabels.map((x, j) => getTextColor(zMatrix[i][j], x, y))
  );

  // Compute height based on the viewport size
  const viewportHeight = window.innerHeight;
  const plotDimension = Math.min(viewportHeight * 0.8, 1000);

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
            size: 10,
            color: textColorMatrix,
          },
          nullcolor: '#121200',  // <--- couleur pour les valeurs nulles
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
        autosize: true,
        height: plotDimension,
        width: plotDimension + 300,
        margin: { t: 0, l: 80, r: 40, b: 140 },
        xaxis: {
          tickFont: { size: 20 },
          tickangle: -45,
          automargin: true,
        },
        yaxis: {
          tickFont: { size: 20 },
          automargin: true,
        },
      }}
      config={{
        responsive: true,
        displayModeBar: false,
      }}
      style={{ width: '100%' }}
    />
  );
}
