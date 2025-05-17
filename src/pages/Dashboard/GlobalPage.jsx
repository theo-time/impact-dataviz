import React from 'react'
import BoxPlot from '../../components/Charts/BoxPlot.jsx'
import impactsLongMerged from '../../data/impacts_long_merged.json';
import categoryImpacts from '../../data/categorie_impacts.json';

export default function GlobalPage() {
  console.log(categoryImpacts);
  console.log(impactsLongMerged);

  return (
    <div className="global-page">
      <h1>Global Page</h1>
      <p>This is the global page content.</p>
      <div>GlobalPage</div>
      <BoxPlot data={impactsLongMerged.filter((item, index) => item.UUID_cat == categoryImpacts[0]['UUID_cat'])} />
    </div>
  )
}
