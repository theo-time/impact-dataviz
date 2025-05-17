import React from 'react'
import BoxPlot from '../../../components/Charts/BoxPlot.jsx'
import impactsLongMerged from '../../../data/impacts_long_merged.json';
import categoryImpacts from '../../../data/categorie_impacts.json';
import './DistributionPage.scss';
import DashboardPage from '../DashboardPage.jsx';

export default function DistributionPage() {
  return (
    <DashboardPage
      title="Distribution des procédés par impact"
      subtitle="Chaque graphique représente une catégorie d’impact (comme le changement climatique ou l’acidification).
      Les points montrent les procédés, la boîte résume leur distribution: médiane, écart, valeurs extrêmes.
      En un coup d’ œil, identifiez les procédés les plus impactants."
    >
      <div className="grid-boxplots">
        {categoryImpacts.map((cat, index) => {
          const filtered = impactsLongMerged.filter(
            d => d.UUID_cat === cat.UUID_cat
          );

          return (
            <div key={index} className="boxplot-card">
              <div className='chart-title'>{cat['Nom français']?.trim() || 'Catégorie'}</div>
              <BoxPlot data={filtered} />
            </div>
          );
        })}
      </div>
    </DashboardPage >
  );
}
