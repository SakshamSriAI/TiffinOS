import React from 'react';

export const Table = ({ children, className = '' }) => {
  return (
    <div className="w-full overflow-x-auto rounded-card border border-border bg-white shadow-subtle">
      <table className={`w-full text-left text-sm text-charcoal border-collapse ${className}`}>
        {children}
      </table>
    </div>
  );
};

export const TableHead = ({ children, className = '' }) => {
  return (
    <thead className={`bg-surface-subtle/80 border-b border-border text-xs uppercase tracking-wider font-semibold text-muted-text ${className}`}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className = '' }) => {
  return (
    <tbody className={`divide-y divide-border/60 ${className}`}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className = '', hover = true, onClick }) => {
  return (
    <tr
      onClick={onClick}
      className={`
        ${hover ? 'hover:bg-surface-subtle/50 transition-colors' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </tr>
  );
};

export const TableHeader = ({ children, className = '', align = 'left' }) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align] || 'text-left';

  return (
    <th scope="col" className={`px-4 sm:px-6 py-3.5 font-semibold ${alignClass} ${className}`}>
      {children}
    </th>
  );
};

export const TableCell = ({ children, className = '', align = 'left' }) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align] || 'text-left';

  return (
    <td className={`px-4 sm:px-6 py-4 whitespace-nowrap text-sm ${alignClass} ${className}`}>
      {children}
    </td>
  );
};

export default Table;
