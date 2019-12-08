import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './index.less';

export default function MyMenu(props) {
  const { title, subTitle, index: { first, second } } = props;
  return (
    <div className={styles.header}>
      <p>{title}</p>
      <p>
        {subTitle.map((letter, index) => {
          return <span className={classnames({ [styles.blueColor]: index + 1 === first || index + 1 === second })}>{letter}</span>
        })}
      </p>
    </div>
  )
}

MyMenu.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  index: PropTypes.object
}