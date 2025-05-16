import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import categoryTree from '../data/arbre_categories.json';

const renderTree = (node, path = '', setSelectedNode) => {
  return Object.entries(node).map(([label, children]) => {
    const itemId = path === '' ? label : `${path}/${label}`;
    const level = path === '' ? 0 : path.split('/').length;
    const pathObj = {
      'categorie_niv_1': itemId.split('/')[0],
      'categorie_niv_2': itemId.split('/')[1],
      'categorie_niv_3': itemId.split('/')[2],
      'categorie_niv_4': itemId.split('/')[3],
    }

    // Do not display the leaves
    if (children === null || typeof children !== 'object') {
      return null;
    }

    // Do not display categories with empty trimmed label
    if (label.trim() === '') {
      return null;
    }


    const handleClick = (e) => {
      e.stopPropagation();
      // console.log(`Clicked: ${label} | level ${level} | itemId: ${itemId}`);
      // console.log(`Path: ${JSON.stringify(pathObj)}`);
      console.log(`Clicked: ${label} | level ${level} | itemId: ${itemId}`);
      setSelectedNode({ level, label, path: pathObj });
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
