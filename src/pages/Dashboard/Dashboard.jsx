import React from 'react';
import { Outlet } from 'react-router-dom';
import './Dashboard.scss';
import DashboardNavigation from './DashboardNavigation.jsx';

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <DashboardNavigation />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
