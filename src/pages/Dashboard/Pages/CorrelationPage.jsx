
import React, { useMemo } from 'react';
import impactsLongMerged from '../../../data/impacts_long_merged.json';

import './DistributionPage.scss';
import DashboardPage from '../DashboardPage.jsx';
import CorrelationHeatmap from '../../../components/Charts/CorrelationHeatmap.jsx';
import impactCorrelations from '../../../data/correlations.json';

export default function CorrelationPage() {
  const [selectedImpactCategory, setSelectedImpactCategory] = React.useState('Acidification');

  console.log('impactsLongMerged', impactsLongMerged);
  console.log('selectedImpactCategory', selectedImpactCategory);

  const impactsFiltered = impactsLongMerged.filter((item, index) => item.valeur > 0 && item.category_name == selectedImpactCategory
    // && item.categorie_niv_1 != 'Composant electrique et electronique'
  )

  return (
    <DashboardPage
      title="Corrélations entre catégories d’impact"
      subtitle=""
    >
      <CorrelationHeatmap data={impactCorrelations} />
    </DashboardPage >
  );
}
