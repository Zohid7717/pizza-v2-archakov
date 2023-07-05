import React, { FC } from 'react';

import styles from './NotFoundBlock.module.scss'


const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдена :(</h1>
    </div>
  );
}

export default NotFoundBlock;
