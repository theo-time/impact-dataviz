import React, { useState } from 'react'
import BoxPlot from '../../../components/Charts/BoxPlot.jsx'
import impactsLongMerged from '../../../data/impacts_long_merged.json';
import categoryImpacts from '../../../data/categorie_impacts.json';
import './DistributionPage.scss';
import DashboardPage from '../DashboardPage.jsx';

export default function DistributionPage() {
  const [useLogScale, setUseLogScale] = useState(true);


  // Filtrage des données selon l'échelle
  const filteredImpacts = impactsLongMerged.filter(d => {
    const val = d.valeur;
    return !isNaN(val) && isFinite(val) && (useLogScale ? val > 0 : true);
  });


  return (
    <DashboardPage
      title="Distribution des procédés par impact"
      subtitle="Chaque graphique représente une catégorie d’impact (comme le changement climatique ou l’acidification).
      Les points montrent les procédés, la boîte résume leur distribution: médiane, écart, valeurs extrêmes.
      En un coup d’ œil, identifiez les procédés les plus impactants."
    >
      <button onClick={() => setUseLogScale(!useLogScale)} style={{ marginBottom: '10px' }}>
        Échelle : {useLogScale ? 'Logarithmique' : 'Linéaire'}
      </button>

      <div className="grid-boxplots">
        {categoryImpacts.map((cat, index) => {
          const filtered = filteredImpacts.filter(
            d => d.UUID_cat === cat.UUID_cat
          );

          return (
            <div key={index} className="boxplot-card">
              <div className='chart-title'>{cat['Nom français']?.trim() || 'Catégorie'}</div>
              <BoxPlot data={filtered} useLogScale={useLogScale} />
            </div>
          );
        })}
      </div>
    </DashboardPage >
  );
}
