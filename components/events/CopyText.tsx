'use client'
import React, { useRef, useState } from 'react';
import styles from './CopyText.module.css';

const CopyText = ({text,children}:{text:string,children:React.ReactNode}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    if (text) {
      const textToCopy = text;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopied(true);
          console.log('Text copied to clipboard:', textToCopy);
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        })
        .catch(err => {
          console.error('Failed to copy text:', err);
        });
    }
  };

  return (
    <div className={styles["copy-text-container"]} onClick={handleCopyText}>
      <div ref={textRef} className={`${styles['copy-text-content']} ${copied ? `${styles.copied}` : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default CopyText;
