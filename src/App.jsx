import { useState } from 'react'

import categoryTree from './data/arbre_categories.json';
import impactsLongMerged from './data/impacts_long_merged.json';

import TreeSelector from './components/TreeSelector.jsx';
import ComparativePlot from './components/ComparativePlot.jsx';
import './App.scss'

function App() {
  const [count, setCount] = useState(0)
  const [selectedNode, setSelectedNode] = useState({ level: null, label: null });

  return (
    <div className='app'>
      <div className='header'>
        <div className='title-container'>
          <div className='title'>ImpactVIZ</div>
          <div className='subtitle'>Visualisation des impacts environnementaux</div>
        </div>
      </div>

      <div className='explore-page'>
        <div className='tree-selector-container'>
          {/* <div>Level: {selectedNode.level}</div>
          <div>Label: {selectedNode.label}</div> */}
          <TreeSelector selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
        </div>
        {/* <div className='comparative-plot-block'> */}
        <div className='comparative-plot-container'>
          <ComparativePlot data={impactsLongMerged} selectedNode={selectedNode} />
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default App
