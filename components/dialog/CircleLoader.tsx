import React from 'react';
import styles from './CircleLoader.module.css'; // Assuming you have some CSS for styling

type CircleLoaderProps = {
  size?: 'sm'
}

const CircleLoader = ({size}:CircleLoaderProps) => {
  return (
    <>
    {size !== 'sm' ?
    <div className={styles['circle-loader']}>
      <div className={styles.circle}></div>
    </div> :
    <span className={styles['circle-loader-sm']}>
      <span className={styles['circle-sm']}></span>
    </span>}
    </>
  );
};

export default CircleLoader;
