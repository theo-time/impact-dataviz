
import React, { useMemo } from 'react';

import impactsLongMerged from '../../../data/impacts_long_merged.json';
import categoryImpacts from '../../../data/categorie_impacts.json';
import DashboardPage from '../DashboardPage.jsx';
import BarChart from '../../../components/Charts/BarChart.jsx';

export default function GreatestImpacts() {

  // Filtrer par la catégorie 'Acidification'
  const impactsFiltered = useMemo(() => {
    return impactsLongMerged.filter((item) => item.valeur > 0 && item.category_name == 'Acidification');
  }, [impactsLongMerged]);

  // Filtrer les 10 plus grands impacts
  const topImpacts = useMemo(() => {
    return impactsFiltered.sort((a, b) => b.valeur - a.valeur).slice(0, 10);
  }, [impactsFiltered]);

  return (
    <DashboardPage
      title="Top 10 des procédés les plus impactants"
      subtitle=" "
    >
      <div className='chart-title'>Acidification</div>
      <BarChart data={topImpacts} xScale='linear' />

    </DashboardPage >
  );
}
