import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import { MenuItem, TextField, Tooltip } from '@mui/material';
import impactColors from '../../configs/colorCode.js';
// import './CountryRanking.css';


export default function CountryRanking({ data, datasetName, label }) {
  const [category, setCategory] = useState('Changement climatique');
  const [filteredData, setFilteredData] = useState([]);


  const categories = useMemo(() => {
    const set = new Set();
    data.forEach(item => {
      if (item.category_name && item.valeur > 0) {
        set.add(item.category_name.trim());
      }
    });
    return Array.from(set).sort();
  }, [data]);


  useEffect(() => {
    const filtered = data.filter(item => item.category_name?.trim() === category && item.valeur > 0);
    const maxValue = Math.max(...filtered.map(item => item.valeur));

    const final_filtered = filtered
      .map(item => ({
        country: item["Zone géographique"],
        value: item.valeur,
        value_normalized: item.valeur / maxValue,
        unit: item["Unité"],
        impact_unit: item["Unité de référence"],
        datasetName: datasetName
      }))
      .sort((a, b) => b.value - a.value);
    setFilteredData(final_filtered);
  }, [category, data]);

  return (
    <>
      <h4 style={{ fontSize: '25px' }}>{label}</h4>
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
        {filteredData.map(({ country, value, unit, impact_unit, value_normalized, datasetName }, index) => {
          const widthPercent = value_normalized * 100 - 15;
          const tooltipContent = (
            <>
              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{country}</div>
              <div>{value.toLocaleString('fr-FR', { maximumSignificantDigits: 3 })} {unit}</div>
            </>
          );

          return (
            <div key={country + unit + impact_unit + datasetName} className="bar-row">
              <div className="label">
                {/* <img src={`https://flagcdn.com/w40/${FlagMap[country].toLowerCase()}.png`} alt={country} /> */}
                <span className="country">{country}</span>
              </div>
              <div className="bar-wrapper">
                <Tooltip
                  title={tooltipContent}
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: 'white',
                        color: 'black',
                        border: '1px solid black',
                        fontSize: '0.85rem',
                        padding: '6px 10px'
                      }
                    }
                  }}
                >
                  <div className="geo-bar" style={{ width: `${widthPercent}%`, backgroundColor: impactColors[category] ?? '#999' }}></div>
                </Tooltip>
                <span className="value">
                  <strong>{value.toLocaleString('fr-FR', { maximumSignificantDigits: 3 })}</strong> <span className="unit">{impact_unit + '/' + unit}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}
