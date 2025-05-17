import React, { use, useEffect } from 'react'
import ImpactCategorySelector from '../components/ImpactCategorySelector.jsx';
import impactsCategoriesData from '../data/categorie_impacts.json';
import ImpactCategoryDetails from '../components/ImpactCategoryDetails.jsx';

export default function Metadata() {
  const [selectedImpactCategory, setSelectedImpactCategory] = React.useState(null);

  // Par défaut, on sélectionne la première catégorie d'impact
  useEffect(() => {
    if (impactsCategoriesData.length > 0) {
      setSelectedImpactCategory(impactsCategoriesData[0]['Nom français']);
    }
  }, [impactsCategoriesData]);

  return (
    <div className='explore-page'>
      <div className='tree-selector-container'>
        {/* <div>Level: {selectedNode.level}</div>
          <div>Label: {selectedNode.label}</div> */}
        <ImpactCategorySelector impactsCategoriesData={impactsCategoriesData} setSelectedImpactCategory={setSelectedImpactCategory} />
      </div>
      {/* <div className='comparative-plot-block'> */}
      <div className='comparative-plot-container'>
        <ImpactCategoryDetails
          data={
            impactsCategoriesData.find((category) => category['Nom français'] === selectedImpactCategory)
          }
        />
      </div>
      {/* </div> */}
    </div>
  )
}
