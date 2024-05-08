import React from 'react';
import styles from './CircleLoader.module.css'; // Assuming you have some CSS for styling

const CircleLoader = () => {
  return (
    <div className={styles['circle-loader']}>
      <div className={styles.circle}></div>
    </div>
  );
};

export default CircleLoader;
