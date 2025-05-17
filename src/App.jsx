import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CategoryBrowser from './pages/CategoryBrowser.jsx';
import './App.scss'
import Header from './components/Header.jsx';
import Metadata from './pages/Metadata.jsx';
import MetadataProcedes from './pages/MetadataProcedes.jsx';

function App() {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path="/" element={<CategoryBrowser />} />
        <Route path="/category-browser" element={<CategoryBrowser />} />
        <Route path='/metadata' element={<Metadata />} />
        <Route path='/metadata-procede' element={<MetadataProcedes />} />
      </Routes>
    </div>
  )
}

export default App
