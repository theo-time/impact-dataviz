import React from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';

import './ImpactCategoryDetails.scss';

// Liste des clés à afficher proprement
const LABELS = {
  'Nom français': 'Nom',
  'English Name': 'Nom (en)',
  'UUID_cat': 'UUID',
  'Unité de référence': 'Unité',
  'Description': 'Description',
  'Commentaire Général': 'Commentaire',
  'Année de référence': 'Année',
  'Niveau de recommandation': 'Niveau',
  'Origine du jeu de données': 'Source',
  'Commanditaire': 'Commanditaire',
};

export default function ImpactCategoryDetails({ data }) {
  if (!data) return null;

  return (
    <div className="impact-details">
      <h1>{data['Nom français']}</h1>
      <div className="details-table">
        {Object.entries(data).map(([key, value]) => {
          // const value = data[key]?.trim();
          if (!value || value.trim() === '') return null;

          return (
            <div className="detail-row" key={key}>
              <div className="detail-label">{key}</div>
              <div className="detail-value">{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}