import React from 'react'
import ImpactCategorySelector from '../components/ImpactCategorySelector.jsx';
import procedeMetadata from '../data/procede_details.json';
import ImpactCategoryDetails from '../components/ImpactCategoryDetails.jsx';
import ProcedeSelector from '../components/ProcedeSelector.jsx';

export default function MetadataProcedes() {
  const [selectedProcede, setSelectedProcede] = React.useState(null);
  console.log('procedeMetadata', procedeMetadata);
  return (
    <div className='explore-page'>
      <div className='tree-selector-container'>
        {/* <div>Level: {selectedNode.level}</div>
          <div>Label: {selectedNode.label}</div> */}
        <ProcedeSelector procedeMetadata={procedeMetadata} setSelectedProcede={setSelectedProcede} />
      </div>
      {/* <div className='comparative-plot-block'> */}
      <div className='comparative-plot-container'>
        <ImpactCategoryDetails
          data={
            procedeMetadata.find((procede) => procede['Nom du flux'] === selectedProcede)
          }
        />
      </div>
      {/* </div> */}
    </div>
  )
}
