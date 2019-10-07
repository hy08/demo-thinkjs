import React, { Component } from 'react';
import { Redirect } from 'umi';
import { message } from 'antd';
import { stringify } from 'querystring';
import { clearToken } from '../utils/authority';
import PageLoading from '@/components/PageLoading';

export default class SecurityLayout extends Component {
  state = {
    isReady: false,
    isLogin: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    let token = localStorage.getItem('token');
    if (!token) {
      message.error('用户尚未登录，请登录后台系统');
      return;
    } else {
      let tokenArray = token.split('.')
      if (tokenArray.length !== 3) {
        message.error('身份验证错误，请重新登录')
        return;
      }
      let payload = JSON.parse(Base64.decode(tokenArray[1]))
      if (Date.now() > payload.exp * 1000) {
        message.error('登录已超时，请重新登录')
        clearToken();
        return;
      }
      this.setState({
        isLogin: true,
      });
    }
  }

  render() {
    const { isReady, isLogin } = this.state;
    const { children } = this.props;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if (!isReady) {
      return <PageLoading />;
    }

    if (!isLogin) {
      return <Redirect to={`/user/login?${queryString}`}></Redirect>;
    }

    return children;
  }
}
