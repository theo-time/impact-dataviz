import { useState } from 'react'

import categoryTree from './data/arbre_categories.json';
import impactsLongMerged from './data/impacts_long_merged.json';

import TreeSelector from './components/TreeSelector.jsx';
import ComparativePlot from './components/ComparativePlot.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [selectedNode, setSelectedNode] = useState({ level: null, label: null });

  console.log(categoryTree);
  return (
    <>

      <div className='title'>ImpactVIZ</div>

      <div className='explore-page'>
        <div className='tree-selector-container'>

          <div>Level: {selectedNode.level}</div>
          <div>Label: {selectedNode.label}</div>
          <TreeSelector selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
        </div>
        {/* <div className='comparative-plot-block'> */}
        <div className='comparative-plot-container'>
          {/* <h2>Comparatif des impacts environnementaux</h2>
          <div>Comparative plot will be here</div> */}
          <ComparativePlot data={impactsLongMerged} selectedNode={selectedNode} />
        </div>
        {/* </div> */}
      </div>
    </>
  )
}

export default App
