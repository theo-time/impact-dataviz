import React, { useState } from 'react';
import impactsLongMerged from '../data/impacts_long_merged.json';

import TreeSelector from '../components/TreeSelector.jsx';
import ComparativePlot from '../components/ComparativePlot.jsx';
import { Button } from '@mui/material';

export default function CategoryBrowser() {
  const [count, setCount] = useState(0)
  const [selectedNode, setSelectedNode] = useState({ level: -1, label: null });

  return (
    <>

      <div className='explore-page'>
        <div className='tree-selector-container'>
          {/* <div>Level: {selectedNode.level}</div>
          <div>Label: {selectedNode.label}</div> */}
          <TreeSelector selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
        </div>
        {/* <div className='comparative-plot-block'> */}
        <div className='comparative-plot-container'>
          <ComparativePlot data={impactsLongMerged} selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
        </div>
        {/* </div> */}
      </div>
    </>
  )
}
