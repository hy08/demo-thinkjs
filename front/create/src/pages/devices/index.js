import React from 'react';
import { isNil } from 'lodash';
import Categroy from './category';
import Detail from './detail';

//依据路由判断页面类型？分类页(获取某类商品列表):详情页(获取商品详情)
export default function Index(props) {
  const { id } = props.match.params;
  return (
    isNil(id) ? <Categroy /> :
      <Detail id={id} />
  )
}