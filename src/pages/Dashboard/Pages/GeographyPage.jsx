// File: GeographyPage.jsx
import React, { useMemo, useState } from 'react';
import mixElecData from '../../../data/mix_electriques.json';
import DashboardPage from '../DashboardPage.jsx';
import FlagMap from '../../../data/flags_by_country.json';
import './GeographyPage.css';
import { MenuItem, TextField } from '@mui/material';

export default function GeographyPage() {
  const [category, setCategory] = useState('Changement climatique');

  const categories = useMemo(() => {
    const set = new Set();
    mixElecData.forEach(item => {
      if (item.category_name && item.valeur > 0) {
        set.add(item.category_name.trim());
      }
    });
    return Array.from(set).sort();
  }, []);

  const filteredData = useMemo(() => {
    const filtered = mixElecData.filter(item => item.category_name?.trim() === category && item.valeur > 0);
    const maxValue = Math.max(...filtered.map(item => item.valeur));
    console.log('maxValue', maxValue);
    console.log('itemWithMaxValue', mixElecData.find(item => item.valeur === maxValue));
    return filtered
      .map(item => ({
        country: item["Zone géographique"],
        value: item.valeur,
        value_normalized: item.valeur / maxValue,
        unit: item["Unité de référence"]
      }))
      .sort((a, b) => b.value - a.value);
  }, [category]);


  return (
    <DashboardPage title="Analyses par pays" subtitle="Par pays">
      <label htmlFor="category-select">Catégorie d’impact :</label>
      <TextField
        select
        label="Catégorie d’impact"
        value={category}
        onChange={e => setCategory(e.target.value)}
        size="small"
      >
        {categories.map(opt => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>

      <div className="bar-chart-container">
        {filteredData.map(({ country, value, unit, value_normalized }) => {
          const widthPercent = value_normalized * 100 - 2;
          const flag = FlagMap[country] || '🌍';
          return (
            <div key={country} className="bar-row">
              <div className="label">
                <span className="flag">{flag}</span>
                <span className="country">{country}</span>
              </div>
              <div className="bar-wrapper">
                <div className="bar" style={{ width: `${widthPercent}%` }}>
                </div>
                <span className="value">{value.toLocaleString('fr-FR', { maximumSignificantDigits: 3 })} {unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardPage>
  );
}
