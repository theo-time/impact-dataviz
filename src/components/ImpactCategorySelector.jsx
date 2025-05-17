import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import categoryTree from '../data/arbre_categories.json';

const categoryItem = (setSelectedImpactCategory) => {
  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedImpactCategory(null);
  }
  return (
    <TreeItem
      key={itemId} itemId={itemId} label={label}
      onClick={handleClick}>
      {renderTree(children, itemId, setSelectedNode)}
    </TreeItem>
  );
};

export default function ImpactCategorySelector({ impactsCategoriesData, setSelectedImpactCategory }) {

  return (
    <Box sx={{ minHeight: 400, minWidth: 300 }}>
      <SimpleTreeView>
        {
          impactsCategoriesData.map((category, index) => {
            return (
              <TreeItem
                key={index} itemId={category['Nom français']} label={category['Nom français']}
                onClick={() => {
                  setSelectedImpactCategory(category['Nom français']);
                }}
              />
            )
          })
        }
      </SimpleTreeView>
    </Box>
  );
}
