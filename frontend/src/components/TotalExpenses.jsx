import React from 'react';

const TotalExpenses = ({ total }) => (
  <div className="text-right mt-4">
    <span className="text-lg font-semibold">
      Total: ${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
    </span>
  </div>
);

export default TotalExpenses;
