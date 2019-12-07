import React from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import classnames from 'classnames';
import styles from './index.less';

export default function MyMenu(props) {
  const menus = props.menus.map(menu => {
    return <Link key={menu.name} to={menu.href} className={classnames(styles.link, { [styles.current]: menu.current })}>{menu.name}</Link>
  })
  return (
    <div className={classnames(styles.linkWrap, { [styles.isSmallSpace]: props.isSmallSpace })}>
      {menus}
    </div>
  )
}

MyMenu.propTypes = {
  menus: PropTypes.array,
  isSmallSpace: PropTypes.bool
}
