import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Pagination } from 'antd';
import { isEmpty, isNil, split } from 'lodash';
import MyBreadcrumb from '../../components/MyBreadcrumb';
import MyMenu from '../../components/MyMenu';
import TextHeader from '../../components/TextHeader';
import PhotoTable from '../../components/PhotoTable';
import styles from './index.less';

@connect(({ model }) => ({}))
class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryCode: props.categoryCode,
      current: 1,
      pageSize: 6,
      total: 0,
      breadcrumbs: [
        { name: '产品展示', href: '/products' }
      ],
      menus: [],
      products: []
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
        this.setMyBreadcrumbAndMenus(data);
      }
    });
    this.getProductsInCategory();
  }
  componentDidUpdate(prevProps) {
    //商品种类变化，重新请求数据
    if (prevProps.match && (prevProps.match.params.categoryCode !== this.props.match.params.categoryCode)) {
      const { categoryCode } = this.props.match.params;
      this.setState({
        categoryCode,
      }, () => {
        this.getProductsInCategory();
      });
    }
  }
  //获取对应种类的商品
  getProductsInCategory = () => {
    const { categoryCode, current, pageSize } = this.state;
    let payloadData = {
      current: current,
      pageSize
    };
    if (!isNil(categoryCode)) {
      payloadData.categoryCode = categoryCode;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'model/getProducts',
      payload: {
        data: payloadData,
        success: (resData) => {
          let data = resData.data.map(item => {
            return { alt: item.name, photo: split(item.pics, ',')[0], href: '/products/' + item.category_code + '/' + item.id }
          })
          this.setState({ products: data, total: resData.count })
        }
      },
    });
  }
  onChange = (pageNumber) => {
    this.setState({ current: pageNumber }, this.getProductsInCategory)
  }
  //设置
  setMyBreadcrumbAndMenus = (categorys) => {
    const { categoryCode, breadcrumbs } = this.state;
    const currentCategory = categorys.find(category => category.code === categoryCode);
    if (!isEmpty(currentCategory)) {
      breadcrumbs.push({ name: currentCategory.category, href: '/products/' + currentCategory.code });
    }
    let menus = categorys.map(category => {
      let current = !isEmpty(currentCategory) && category.code === currentCategory.code ? true : false;
      return { name: category.category, href: '/products/' + category.code, current: current };
    });
    this.setState({ breadcrumbs, menus: [...menus] });
  }
  render() {
    const { breadcrumbs, menus, products, current, total } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.headerNav}>
          <MyBreadcrumb links={breadcrumbs} />
          <MyMenu menus={menus} />
        </div>
        <div className={styles.content}>
          <TextHeader
            title='产品展示'
            subTitle='PRODUCT SHOW​'
            highLightIndexObj={{ first: 1, second: 9 }} />
          <PhotoTable list={products} />
          <Pagination defaultCurrent={current} total={total} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  categoryCode: PropTypes.string
}
export default Category;