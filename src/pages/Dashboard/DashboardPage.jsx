import React from 'react';
import './DashboardPage.scss';

export default function DashboardPage({ title, subtitle, children }) {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      <div className="dashboard-page-content">
        {children}
      </div>
    </div>
  );
}
