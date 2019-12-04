import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon } from 'antd';
import styles from './index.less';

export default function MyBreadcrumb(props) {
  const links = props.links.map((link, index) => {
    if (index < props.links.length - 1) {
      return <Breadcrumb.Item href={link.href} className={styles.last}>{link.name}</Breadcrumb.Item>
    } else {
      return <Breadcrumb.Item>{link.name}</Breadcrumb.Item>
    }
  })
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">
        <Icon type="home" />
      </Breadcrumb.Item>
      {links}
    </Breadcrumb>
  )
}

MyBreadcrumb.propTypes = {
  links: PropTypes.array
}