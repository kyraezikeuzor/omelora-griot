// components/Tooltip.tsx
import React from 'react';
import styles from './Tooltip.module.css'

interface TooltipProps {
  tooltipContent: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({tooltipContent, children }) => {
  return (
    <span  data-tooltip={tooltipContent}>
      <span className={styles.tooltip} data-tooltip={tooltipContent}>
        {children}
      </span>
    </span>
  );
};

export default Tooltip;
