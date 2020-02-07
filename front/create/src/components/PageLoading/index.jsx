import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

export default function Loading(props) {
  return (
    <div className={styles.load}>
      <Spin size="large" />
    </div>
  )
}