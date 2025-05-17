
import React, { useMemo } from 'react';
import impactsLongMerged from '../../../data/impacts_long_merged.json';

import './DistributionPage.scss';
import DashboardPage from '../DashboardPage.jsx';
import SunburstChart from '../../../components/Charts/Sunburst.jsx';
import SunburstDemo from '../../../components/Charts/SunburstDemo.jsx';
import ImpactCategoryDropDown from '../../../components/ImpactCategoryDropDown.jsx';

export default function SunburstPage() {
  const [selectedImpactCategory, setSelectedImpactCategory] = React.useState(' Acidification ');

  console.log('impactsLongMerged', impactsLongMerged);
  console.log('selectedImpactCategory', selectedImpactCategory);

  const impactsFiltered = impactsLongMerged.filter((item, index) => item.valeur > 0 && item.category_name == selectedImpactCategory);

  return (
    <DashboardPage
      title="Importance relative des catégories d’impacts"
      subtitle="todo"
    >
      <ImpactCategoryDropDown
        data={impactsLongMerged}
        category={selectedImpactCategory}
        setCategory={setSelectedImpactCategory} />
      <SunburstChart data={impactsFiltered} />
      {/* .filter((item, index) => index < 1) */}
      {/* <SunburstDemo /> */}
    </DashboardPage >
  );
}
