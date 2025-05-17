import React from 'react';
import { NavLink } from 'react-router-dom';
import './LeftPanel.scss';

export default function DashboardNavigation() {
  const links = [
    { label: 'Global', path: '/dashboard/globals' },
    { label: 'Sunburst', path: '/dashboard/sunburst' }
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
