'use client'
import React from 'react';

export default function Specifications({ specifications }) {
  return (
    <div>
      <h2>مشخصات فنی</h2>
      <table>
        <tbody>
          {specifications.map((spec) => (
            <tr key={spec.id}>
              <td>{spec.feature}</td>
              <td>{spec.value}</td>
              {spec.note && (
                <td>
                  <small>{spec.note}</small>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
