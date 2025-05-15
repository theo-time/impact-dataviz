import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import categoryTree from '../data/arbre_categories.json';

const renderTree = (node, path = '', setSelectedNode) => {
  return Object.entries(node).map(([label, children]) => {
    const itemId = `${path}/${label}`;
    const level = path === '' ? 0 : path.split('/').length;

    const handleClick = (e) => {
      e.stopPropagation();
      console.log(`Clicked on ${label}`);
      console.log(`Level: ${level}`);
      setSelectedNode({ level, label });
    };

    if (children === null || typeof children !== 'object') {
      return <TreeItem key={itemId} itemId={itemId} label={label} onClick={handleClick} />;
    }
    return (
      <TreeItem
        key={itemId} itemId={itemId} label={label}
        onClick={handleClick}>
        {renderTree(children, itemId, setSelectedNode)}
      </TreeItem>
    );
  });
};

export default function TreeSelector({ selectedNode, setSelectedNode }) {
  return (
    <Box sx={{ minHeight: 400, minWidth: 300 }}>
      <SimpleTreeView>
        {renderTree(categoryTree, '', setSelectedNode)}
      </SimpleTreeView>
    </Box>
  );
}
