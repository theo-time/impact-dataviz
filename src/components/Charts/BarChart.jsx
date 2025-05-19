import React from 'react'

export default function BarChart() {
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
          marker: { color: '#007acc' },
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
        height: sortedData.length * 30 + 100,
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
