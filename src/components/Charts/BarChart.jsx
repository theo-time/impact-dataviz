
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

function removeProductionSuffix(input) {
  const target1 = ", production industrielle; mix national français, à l'usine";
  const target2 = "; production industrielle; mix national français, à l'usine";

  var input = input.replace(target1, '');
  input = input.replace(target2, '');
  return input;
}

// Returns first 100 characters of the label and ellipsis if longer
function getShortLabel(procede, maxLength = 100) {
  var nomprocede = procede["Nom du flux"]?.trim() ?? '';

  nomprocede = removeProductionSuffix(nomprocede);

  if (nomprocede.length > maxLength) {
    nomprocede = nomprocede.substring(0, maxLength) + '...';
  }

  return nomprocede;
}

export default function BarChart({ data, xScale, dispModeBar = true, legendSizePercent = 0.15 }) {

  function wrapLabel(label, maxLength = 80) {
    if (!label) return '';
    const words = label.split(/\s+/);
    let lines = [];
    let currentLine = '';

    for (let word of words) {
      if ((currentLine + ' ' + word).trim().length > maxLength) {
        lines.push(currentLine.trim());
        currentLine = word;
        if (lines.length === 1) break; // max 2 lignes
      } else {
        currentLine += ' ' + word;
      }
    }

    lines.push(currentLine.trim());
    return lines.join('<br>'); // ← important : <br> et pas \n
  }


  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.valeur - b.valeur); // tri croissant
  }, [data]);

  const category = sortedData[0]?.category_name?.trim() ?? '';
  const referenceUnit = sortedData[0]?.["Unité de référence"]?.trim() ?? '';


  const labels = sortedData.map(d => wrapLabel(getShortLabel(d)));
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
        ${valeur} ${uniteRef} par ${unite}
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
    <>
      <div style={{ textAlign: 'center', marginLeft: '30%' }}> {`Valeur d'impact (${referenceUnit})`}</div >
      <Plot
        data={[
          {
            type: 'bar',
            x: values,
            y: sortedData.map((_, i) => i), // index numérique pour chaque barre
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
            domain: [legendSizePercent, 1],
          },
          yaxis: {
            tickfont: { size: 12 },
            tickvals: sortedData.map((_, i) => i),
            ticktext: labels,
            domain: [0, 1],
            automargin: true
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
        config={{
          responsive: true,
          displayModeBar: false
        }}
        style={{ width: '100%' }}
      />
    </>
  )
}
