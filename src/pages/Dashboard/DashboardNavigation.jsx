import React from 'react';
import { NavLink } from 'react-router-dom';
import './LeftPanel.scss';

export default function DashboardNavigation() {
  const links = [
    { label: 'Procédés les plus impactants', path: '/dashboard/greatest-impacts' },
    { label: 'Classements Pays', path: '/dashboard/geography' },
    { label: 'Correlation', path: '/dashboard/correlation' },
    { label: 'Distribution', path: '/dashboard/distribution' },
    { label: 'Sunburst', path: '/dashboard/sunburst' },
  ];

  return (
    <nav className="left-panel">
      <h2 className="title">Dashboard</h2>
      <ul>
        {links.map(({ label, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
