
import React, { useMemo } from 'react';
import impactsLongMerged from '../../../data/impacts_long_merged.json';

import './DistributionPage.scss';
import DashboardPage from '../DashboardPage.jsx';
import SunburstChart from '../../../components/Charts/Sunburst.jsx';
import SunburstDemo from '../../../components/Charts/SunburstDemo.jsx';
import ImpactCategoryDropDown from '../../../components/ImpactCategoryDropDown.jsx';

export default function SunburstPage() {
  const [selectedImpactCategory, setSelectedImpactCategory] = React.useState('Acidification');

  const impactsFiltered = impactsLongMerged.filter((item, index) => item.valeur > 0 && item.category_name == selectedImpactCategory
    // && item.categorie_niv_1 != 'Composant electrique et electronique'
  )

  return (
    <DashboardPage
      title="Importance relative des catégories de procédés"
      subtitle="Chaque cercle concentrique de ce graphique représente un niveau de classification. La largeur de chaque élément est proportionnelle à sa part dans l'impact de la catégorie supérieure.
Cela permet de visualiser la contribution relative de chaque catégorie d'impact."
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
