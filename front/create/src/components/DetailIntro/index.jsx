import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import styles from './index.less';

export default function DetailIntro(props) {
  const { pics, title, category, intro } = props;
  return (
    <div className={styles.detailWrap}>
      <div className={styles.picWrap}></div>
      <div className={styles.introWrap}></div>
    </div>
  )
}

DetailIntro.propTypes = {
  pics: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }),
  intro: PropTypes.string.isRequired
}