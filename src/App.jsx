import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import CategoryBrowser from './pages/CategoryBrowser.jsx';
import './App.scss'
import Header from './components/Header.jsx';
import Metadata from './pages/Metadata.jsx';
import MetadataProcedes from './pages/MetadataProcedes.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import DistributionPage from './pages/Dashboard/Pages/DistributionPage.jsx';
import SunburstPage from './pages/Dashboard/Pages/SunburstPage.jsx';
import CorrelationPage from './pages/Dashboard/Pages/CorrelationPage.jsx';
import GreatestImpacts from './pages/Dashboard/Pages/GreatestImpacts.jsx';
import GeographyPage from './pages/Dashboard/Pages/GeographyPage.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category-browser" element={<CategoryBrowser />} />
        <Route path='/metadata' element={<Metadata />} />
        <Route path='/metadata-procede' element={<MetadataProcedes />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="greatest-impacts" />} />
          <Route path="distribution" element={<DistributionPage />} />
          <Route path="sunburst" element={<SunburstPage />} />
          <Route path="correlation" element={<CorrelationPage />} />
          <Route path="greatest-impacts" element={<GreatestImpacts />} />
          <Route path="geography" element={<GeographyPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
