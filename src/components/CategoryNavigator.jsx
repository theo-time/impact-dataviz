import React from 'react'
import { Box, Typography } from '@mui/material'

export default function CategoryNavigator({ selectedNode, setSelectedNode }) {

  if (!selectedNode || !selectedNode.path || selectedNode.path.length === 0) {
    return null;
  }
  console.log('selectedNode', selectedNode);


  return (
    selectedNode?.path && (
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
          {selectedNode.path.map((segment, index) => (
            <Box
              key={index}
              component="button"
              onClick={() => {
                const newPath = selectedNode.path.slice(0, index + 1);
                const newLevel = newPath.length - 1;
                const newLabel = newPath[newPath.length - 1];
                setSelectedNode({
                  path: newPath,
                  level: newLevel,
                  label: newLabel,
                });
              }}
              sx={{
                background: 'none',
                border: 'none',
                // color: '#007acc',
                cursor: 'pointer',
                padding: 0,
                // textDecoration: 'underline',
                fontSize: '0.875rem',
              }}
            >
              {segment}
            </Box>
          )).reduce((acc, curr, i, arr) => {
            acc.push(curr);
            if (i < arr.length - 1) {
              acc.push(<span key={`sep-${i}`}>/</span>);
            }
            return acc;
          }, [])}
        </Box>
      </Box>
    )
  )
}
