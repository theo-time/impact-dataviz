import React from 'react';
import Plot from 'react-plotly.js';

export default function SunburstPlot() {

  const labels = [
    'Eve', 'Cain', 'Seth', 'Enos', 'Noam',
    'Abel', 'Awan', 'Enoch', 'Azura',
  ];

  const parents = [
    '', 'Eve', 'Eve', 'Seth', 'Seth',
    'Eve', 'Eve', 'Awan', 'Eve',
  ];

  const values = [10, 14, 12, 10, 2, 6, 6, 4, 4];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <Plot
        data={[
          {
            type: 'sunburst',
            labels: labels,
            parents: parents,
            values: values,
            outsidetextfont: { size: 20, color: '#377eb8' },
            leaf: { opacity: 0.4 },
            marker: { line: { width: 2 } },
          },
        ]}
        layout={{
          width: 500,
          height: 500,
          margin: { l: 0, r: 0, b: 0, t: 0 },
        }}
        config={{ responsive: true }}
      />
    </div>
  );
}
