import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import categoryTree from '../data/arbre_categories.json';


export default function ProcedeSelector({ procedeMetadata, setSelectedProcede }) {
  console.log('procedeMetadata', procedeMetadata);
  return (
    <Box sx={{ minHeight: 400, minWidth: 300 }}>
      <SimpleTreeView>
        {
          procedeMetadata.map((procede, index) => {
            if (index > 100) {
              return null;
            }
            return (
              <TreeItem
                key={index} itemId={procede['Nom du flux']} label={procede['Nom du flux']}
                onClick={() => {
                  setSelectedProcede(procede['Nom du flux']);
                }}
              />
            )
          })
        }
      </SimpleTreeView>
    </Box>
  );
}
