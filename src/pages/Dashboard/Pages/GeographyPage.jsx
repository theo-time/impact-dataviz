// File: GeographyPage.jsx
import React, { useState } from 'react';
import mixElecData from '../../../data/mix_electriques.json';
import transportFerroData from '../../../data/transport_ferro.json';
import transportRoutierData from '../../../data/transport_routier.json';
import DashboardPage from '../DashboardPage.jsx';
import './GeographyPage.css';
import { Tabs, Tab, Box } from '@mui/material';
import CountryRanking from '../../../components/Charts/CountryRanking.jsx';

export default function GeographyPage() {
  const [selectedDataset, setSelectedDataset] = useState('mix');

  const datasets = {
    mix: mixElecData,
    ferro: transportFerroData,
    routier: transportRoutierData
  };

  return (
    <DashboardPage title="Analyses par pays" subtitle="Par secteur">
      <Tabs
        value={selectedDataset}
        onChange={(e, val) => setSelectedDataset(val)}
        sx={{ mb: 3 }}
      >
        <Tab label="Mix électrique" value="mix" />
        <Tab label="Transport ferroviaire" value="ferro" />
        <Tab label="Transport routier" value="routier" />
      </Tabs>

      <CountryRanking data={datasets[selectedDataset]} datasetName={selectedDataset} />
    </DashboardPage>
  );
}
