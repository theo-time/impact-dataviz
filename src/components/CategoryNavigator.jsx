import React from 'react'
import { Box, Typography } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function CategoryNavigator({ selectedNode, setSelectedNode }) {

  if (!selectedNode || !selectedNode.path || selectedNode.path.length === 0) {
    return null;
  }
  console.log('selectedNode', selectedNode);


  return (
    selectedNode?.path && (
      <Breadcrumbs separator="›" aria-label="fil d’ariane" sx={{ mb: 2 }}>
        {selectedNode.path.map((segment, index) => {
          const isLast = index === selectedNode.path.length - 1;
          return isLast ? (
            <Typography
              key={index}
              color="text.primary"
              fontFamily={'Source Sans Pro'}
              fontWeight={500}
            >
              {segment}
            </Typography>
          ) : (
            <Link
              key={index}
              component="button"
              underline="hover"
              color="text.secondary"
              fontWeight={500}
              fontFamily={'Source Sans Pro'}
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
            >
              {segment}
            </Link>
          );
        })}
      </Breadcrumbs>
    )
  )
}
