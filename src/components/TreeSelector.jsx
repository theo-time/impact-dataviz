import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import categoryTree from '../data/arbre_categories.json';

const renderTree = (node, path = '', setSelectedNode) => {
  return Object.entries(node).map(([label, children]) => {
    const itemId = path === '' ? label : `${path}/${label}`;
    const level = path === '' ? 0 : path.split('/').length;
    const pathArray = path === '' ? [label] : path.split('/').concat(label);

    if (children === null || label.trim() === '' || typeof children !== 'object') return null;
    // Do not display categories with empty trimmed label
    if (label.trim() === '') {
      return null;
    }


    const handleClick = (e) => {
      e.stopPropagation();
      const isLastBranch = Object.keys(children).length === 0 || Object.keys(children).every(key => key.trim() === '' || typeof children[key] !== 'object');
      console.warn(Object.keys(children))
      console.warn(isLastBranch)
      setSelectedNode({ level, label, path: pathArray, isLastBranch });
    };
    if (children === null || typeof children !== 'object') {
      return <TreeItem key={itemId} itemId={itemId} label={label} onClick={handleClick} />;
    }
    return (
      <TreeItem
        key={itemId}
        itemId={itemId}
        label={
          <span style={{
            // fontWeight: level < 2 ? 600 : 500,
            fontWeight: 400,
            fontSize: level === 0 ? '1rem' : level === 1 ? '0.95rem' : '0.9rem',
            opacity: level > 2 ? 0.7 : 0.85,
            color: '#0C2B4D'
          }}>
            {label}
          </span>
        }
        onClick={handleClick}
        sx={{
          // paddingLeft: `${level * 8}px`,
          '& .MuiTreeItem-content': {
            paddingLeft: `${level * 20}px`,
            // adapt vertical gaps also 
            // marginTop: `${(4 - level) * 1}px`,
            // marginBottom: `${(4 - level) * 1}px`,
          },
          '& .MuiTreeItem-content:hover': {
            backgroundColor: 'rgba(0, 123, 255, 0.06)',
          },
          '& .Mui-selected > .MuiTreeItem-content': {
            backgroundColor: 'rgba(0, 123, 255, 0.15)',
          },
        }}
      >
        {renderTree(children, itemId, setSelectedNode)}
      </TreeItem>
    );
  });
};

export default function TreeSelector({ selectedNode, setSelectedNode }) {
  return (
    <Box sx={{ minHeight: 400, minWidth: 280, p: 2 }}>
      <SimpleTreeView>
        {renderTree(categoryTree, '', setSelectedNode)}
      </SimpleTreeView>
    </Box>
  );
}
