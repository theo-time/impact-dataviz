import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import CategoryBrowser from './pages/CategoryBrowser.jsx';
import './App.scss'
import Header from './components/Header.jsx';
import Metadata from './pages/Metadata.jsx';
import MetadataProcedes from './pages/MetadataProcedes.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import GlobalPage from './pages/Dashboard/GlobalPage.jsx';
import SunburstPage from './pages/Dashboard/SunburstPage.jsx';

function App() {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path="/" element={<CategoryBrowser />} />
        <Route path="/category-browser" element={<CategoryBrowser />} />
        <Route path='/metadata' element={<Metadata />} />
        <Route path='/metadata-procede' element={<MetadataProcedes />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="globals" />} />
          <Route path="globals" element={<GlobalPage />} />
          <Route path="sunburst" element={<SunburstPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
