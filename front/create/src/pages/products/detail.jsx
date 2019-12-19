import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Pagination } from 'antd';
import { isEmpty, isNil, split } from 'lodash';
import MyBreadcrumb from '../../components/MyBreadcrumb';
import TextHeader from '../../components/TextHeader';
import styles from './index.less';

@connect(({ model }) => ({}))
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryCode: props.categoryCode,
      productId: props.productId,
      breadcrumbs: [],
      categorys: [],
      product: {},
    };
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'model/getCategorys',
      payload: {
        current: 0,
        pageSize: 100
      },
      success: (data) => {
        this.setState({ categorys: data }, this.setMyBreadcrumb)
      }
    });
    this.getProduct();
  }
  //获取对应种类的商品
  getProduct = () => {
    const { productId } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'model/getProducts',
      payload: {
        data: {
          id: productId
        },
        success: (resData) => {
          this.setState({ product: resData }, this.setMyBreadcrumb)
        }
      },
    });
  }
  //设置面包屑导航
  setMyBreadcrumb = () => {
    const { categoryCode, categorys, product } = this.state;
    let breadcrumbs = [
      { name: '产品展示', href: '/products' }
    ]
    const currentCategory = categorys.find(category => category.code === categoryCode);
    if (!isEmpty(currentCategory)) {
      breadcrumbs.push({ name: currentCategory.category, href: '/products/' + currentCategory.code });
    }
    if (!isEmpty(product)) {
      breadcrumbs.push({ name: product.name });
    }
    this.setState({ breadcrumbs });
  }
  render() {
    const { breadcrumbs, } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.headerNav}>
          <MyBreadcrumb links={breadcrumbs} />
        </div>
        <div className={styles.content}>
          <TextHeader
            title='详情展示'
            subTitle='DETAIL SHOW'
            highLightIndexObj={{ first: 1, second: 8 }} />

        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  categoryCode: PropTypes.string
}
export default Detail;