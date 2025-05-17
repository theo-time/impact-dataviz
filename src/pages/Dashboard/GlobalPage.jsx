import React from 'react'
import BoxPlot from '../../components/Charts/BoxPlot.jsx'
import impactsLongMerged from '../../data/impacts_long_merged.json';
import categoryImpacts from '../../data/categorie_impacts.json';
import './GlobalPage.scss';
import DashboardPage from './DashboardPage.jsx';

export default function GlobalPage() {
  return (
    <DashboardPage
      title="Distribution des procédés par impact"
      subtitle="Cette page présente la distribution des impacts environnementaux de centaines de procédés.
Chaque graphique montre comment les procédés sont répartis pour une catégorie d’impact donnée (comme l’acidification ou le changement climatique).
Le nuage de points représente les procédés individuels, tandis que la boîte montre la répartition globale (médiane, étendue, etc.).
Cela permet d’identifier rapidement les procédés les plus polluants ou les plus sobres, catégorie par catégorie."
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
    </DashboardPage>
  );
}
