import React, { useMemo } from 'react';

import impactsLongMerged from '../../../data/impacts_long_merged.json';
import DashboardPage from '../DashboardPage.jsx';
import BarChart from '../../../components/Charts/BarChart.jsx';

import './GreatestImpacts.scss';

export default function GreatestImpacts() {
  // Liste des catégories présentes dans les données
  const categories = useMemo(() => {
    const set = new Set();
    impactsLongMerged.forEach(item => {
      if (item.category_name && item.valeur > 0) {
        set.add(item.category_name.trim());
      }
    });
    return Array.from(set).sort();
  }, []);

  // Pour chaque catégorie, récupérer le top 10
  const dataByCategory = useMemo(() => {
    return categories.map(category => {
      const filtered = impactsLongMerged
        .filter(item => item.category_name?.trim() === category && item.valeur > 0);

      const top = filtered
        .sort((a, b) => b.valeur - a.valeur)
        .slice(0, 10);

      return { category, data: top };
    });
  }, [categories]);

  return (
    <DashboardPage
      title="Top 10 des procédés les plus impactants"
      subtitle="Par catégorie d’impact"
    >
      {dataByCategory.map(({ category, data }) => (
        <div key={category} className='greatest-impact-container'>
          <div className='chart-title'>{category}</div>
          <BarChart data={data} xScale='linear' dispModeBar={false} legendSizePercent={0.4} />
        </div>
      ))}
    </DashboardPage>
  );
}
