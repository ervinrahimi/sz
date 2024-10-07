'use client'
import React from 'react';

export default function AppearanceSelector({ appearances, selectedAppearances, setSelectedAppearances }) {
  const handleChange = (id, value) => {
    setSelectedAppearances({
      ...selectedAppearances,
      [id]: value,
    });
  };

  return (
    <div>
      <h2>مشخصات ظاهری</h2>
      {appearances.map((appearance) => (
        <div key={appearance.id}>
          <label>{appearance.title}:</label>
          {appearance.options.length > 1 ? (
            <select onChange={(e) => handleChange(appearance.id, e.target.value)}>
              {appearance.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <p>{appearance.options[0]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
