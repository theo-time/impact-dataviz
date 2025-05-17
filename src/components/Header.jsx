import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderMenu.scss';

export default function Header() {
  return (
    <div className='header'>
      <div className='title-container'>
        <div className='title'>ImpactVIZ</div>
        <div className='subtitle'>Visualisation des impacts environnementaux</div>
      </div>
      <header className="header-menu">
        {/* <div className="logo">ImpactVIZ</div> */}
        <nav className="nav-links">
          <NavLink to="/" className="nav-link">Accueil</NavLink>
          <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          <NavLink to="/category-browser" className="nav-link">Exploration</NavLink>
          <NavLink to="/metadata" className="nav-link">Métadonnées</NavLink>
          <NavLink to="/metadata-procede" className="nav-link">Métadonnées (procédés)</NavLink>
          <NavLink to="/about" className="nav-link">À propos</NavLink>

        </nav>
      </header>
    </div>
  );
}
