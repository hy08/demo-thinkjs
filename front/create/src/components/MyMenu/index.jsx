import React from 'react';
import Link from 'umi/link';
import classnames from 'classnames';
import styles from './index.less';

export default function (props) {
  const links = props.links.map(link => {
    return <Link to={link.href} className={classnames({ [styles.current]: link.current })}>{link.name}</Link>
  })
  return (
    <div className={classnames(styles.linkWrap, { [styles.isSmallSpace]: link.isSmallSpace })}>
      {links}
    </div>
  )
}
