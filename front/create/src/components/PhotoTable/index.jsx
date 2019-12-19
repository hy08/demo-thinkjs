import React from 'react';
import PropTypes from 'prop-types';
import router from 'umi/router';
import styles from './index.less';

const gotoDestination = (href) => {
  router.push(href);
}
export default function PhotoTable(props) {
  const { list } = props;
  const photoList = list.map((item, index) => {
    return (
      <div key={index} className={styles.imgWrap} onClick={() => { gotoDestination(item.href) }}>
        <figure>
          <mark>
            <b></b>
          </mark>
          <img alt={item.alt} src={window.location.origin + item.photo} />
        </figure>
        <figcaption>{item.alt}</figcaption>
      </div>
    )
  });
  return (
    <div className={styles.imgsWrap}>
      {photoList}
    </div>
  )
}

PhotoTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(
    {
      photo: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }
  ))
}
