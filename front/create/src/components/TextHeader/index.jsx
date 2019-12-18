import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './index.less';

export default function TextHeader(props) {
  const { title, subTitle, highLightIndexObj: { first, second } } = props;
  return (
    <div className={styles.header}>
      <p>{title}</p>
      <p>
        {subTitle.split('').map((letter, index) => {
          return <span key={index} className={classnames({ [styles.blueColor]: index + 1 === first || index + 1 === second })}>{letter}</span>
        })}
      </p>
    </div>
  )
}

TextHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  highLightIndexObj: PropTypes.object
}