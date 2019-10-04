import ProLayout from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';


const BasicLayout = props => {
  const { dispatch, children, settings } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
            <span>{route.breadcrumbName}</span>
          );
      }}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      footerRender={() => null}
      {...props}
      {...settings}
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
