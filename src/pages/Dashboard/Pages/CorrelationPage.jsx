
import React, { useMemo } from 'react';
import impactsLongMerged from '../../../data/impacts_long_merged.json';

import './DistributionPage.scss';
import DashboardPage from '../DashboardPage.jsx';
import CorrelationHeatmap from '../../../components/Charts/CorrelationHeatmap.jsx';
import impactCorrelations from '../../../data/correlations.json';

export default function CorrelationPage() {
  const [selectedImpactCategory, setSelectedImpactCategory] = React.useState('Acidification');

  const impactsFiltered = impactsLongMerged.filter((item, index) => item.valeur > 0 && item.category_name == selectedImpactCategory
    // && item.categorie_niv_1 != 'Composant electrique et electronique'
  )

  return (
    <DashboardPage
      title="Corrélations entre catégories d’impact"
      subtitle="Explorez les relations entre indicateurs environnementaux ! 
Cette carte de chaleur (heatmap) montre les corrélations linéaires entre les différentes catégories d’impact environnemental.
Une corrélation mesure à quel point deux variables évoluent ensemble : une valeur proche de +1 signifie qu'elles augmentent ou diminuent de concert, une valeur proche de -1 indique un comportement opposé."
    >
      <CorrelationHeatmap data={impactCorrelations} />
    </DashboardPage >
  );
}
