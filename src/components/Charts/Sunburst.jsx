import { formLabelClasses } from "@mui/material";
import React from "react";
import Plot from "react-plotly.js";



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
      if (j === path.length - 1) {
        const entry = nodeMap.get(id);
        entry.total += value;
        entry.count += 1;
      }
    }
  }

  // Étape 3 : extraire labels, parents, valeurs moyennes
  const labels = [];
  const parents = [];
  const values = [];


  for (const [id, node] of nodeMap.entries()) {
    labels.push(node.label);
    parents.push(node.parent);
    const val = node.count > 0 ? node.total / node.count : 0;
    values.push(val);
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
