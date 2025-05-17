import { formLabelClasses } from "@mui/material";
import React from "react";
import Plot from "react-plotly.js";

function wrapLabel(text, maxLineLength = 80) {
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

export default function SunburstChart({ data }) {

  // Étape 1 : nettoyer les niveaux et compresser la hiérarchie
  const paths = data.map(item => {
    const levels = [
      item["Categorie_niv_1"]?.trim(),
      item["Categorie_niv_2"]?.trim(),
      item["Categorie_niv_3"]?.trim(),
      item["Categorie_niv_4"]?.trim(),
      item["Nom du flux"]?.trim()
    ];
    return levels.filter(level => level && level !== "");
  });

  // Étape 2 : construire l'arbre { id, label, parent } + agrégation moyenne
  const nodeMap = new Map(); // id => { label, parent, total, count }

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const value = data[i].valeur;

    for (let j = 0; j < path.length; j++) {
      const id = path.slice(0, j + 1).join(" / ");
      const parent = j === 0 ? "" : path.slice(0, j).join(" / ");
      const label = path.slice(0, j + 1).join(" / ");

      if (!nodeMap.has(id)) {
        nodeMap.set(id, {
          label,
          parent,
          total: 0,
          count: 0,
        });
      }

      // On ne comptabilise que les feuilles
      const entry = nodeMap.get(id);
      entry.total += value;
      entry.count += 1;
    }
  }

  // Étape 3 : extraire labels, parents, valeurs moyennes
  const shorten = (str, max = 30) => {
    return str.length > max ? str.slice(0, max).trim() + '…' : str;
  };

  const labels = [];
  const parents = [];
  const values = [];
  const ids = [];
  const hovertext = [];

  // Étape : détecter les feuilles (dernière entrée de chaque path)
  const leafIds = new Set(paths.map(p => p.join(' / ')));

  for (const [id, node] of nodeMap.entries()) {
    if (leafIds.has(id)) continue; // sauter les feuilles
    // en label on affiche que la fin du chemin
    labels.push(shorten(node.label.split(' / ').slice(-1)[0]));
    parents.push(node.parent);
    const val = node.count > 0 ? node.total / node.count : 0;
    values.push(val);
    ids.push(id);
    hovertext.push(wrapLabel(node.label));
  }

  console.log("labels", labels);
  console.log("parents", parents);
  console.log("values", values);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <Plot
        data={[
          {
            type: 'sunburst',
            ids: ids,
            labels: labels,
            parents: parents,
            values: values,
            hovertext: hovertext,
            hoverinfo: 'text+value',
            outsidetextfont: { size: 14, color: '#333' },
            leaf: { opacity: 0.5 },
            marker: { line: { width: 1.5 } },
            // branchvalues: 'total', // pour la somme des valeurs
          },
        ]}
        layout={{
          width: 500,
          height: 500,
          margin: { l: 0, r: 0, b: 0, t: 0 },
        }}
        config={{
          responsive: true,
          displayModeBar: true,
          displaylogo: false,         // enlève le logo Plotly si tu veux
          modeBarButtonsToRemove: ['select2d', 'lasso2d'], // facultatif : retirer boutons inutiles
        }}
      />
    </div>
  );
}
