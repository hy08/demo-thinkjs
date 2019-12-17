import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { isEmpty, isNil } from 'lodash';
import MyBreadcrumb from '../../components/MyBreadcrumb';
import MyMenu from '../../components/MyMenu';
import TextHeader from '../../components/TextHeader';
import styles from './index.less';

@connect(({ model }) => ({}))
class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryCode: props.categoryCode,
      current: 1,
      pageSize: 10,
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
      current: current - 1,
      pageSize
    };
    if (!isNil(categoryCode)) {
      payloadData.categoryCode = categoryCode;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'model/getProducts',
      payload: {
        data: payloadData
      },
      success: (data) => {
        this.setState({ products: data })
      }
    });
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
  //渲染商品表格
  renderCompanyProfile = () => {
    // const { name } = this.props.company;
    // return (
    //   <>
    //     {this.renderHeader()}
    //     <div className={styles.introContent}>
    //       <p>
    //         <span className={styles.companyName}>{name}</span>成立于1995年，至今有24年历史，位于江苏省昆山市（毗邻上海市），现有员工180名，三年以上员工占比80%，占地4万平方米，建有现代化标准厂房2万平方米以及2万平方的智能化工厂，主要产品: 单卡盒 、精裱盒、手提纸袋、瓦楞彩盒、说明书等。拥有专业设计 – 快速打样 – 个性化定制 –智能化制造及物流系统等行业优势.
    //       </p>
    //       <p>科望在成长道路上一直走在行业前言，紧跟国际一流企业脚步和需求，科望是周边印刷界内第一家开发ERP管理、第一家引进CTP制版、第一家引进UV6+1印刷机、第一家引进UV8+1印刷机、第一家引进ESKO印前软件、第一家引进HP Indigo数码印刷机、第一家引进亚洲最先进的UV冷烫双上光九色印刷机的民营印刷高企。</p>
    //       <p>2018年科望工业4.0模式的智能工厂建成。六千库位智能立体仓库，2018年6月更是迎来了印刷界终极利器“亚洲一号”：曼罗兰9+2即亚洲最先进的UV冷烫双上光九色印刷机，打造世界级高端智能包装印刷综合体。</p>
    //     </div>
    //   </>
    // )
  }
  render() {
    const { breadcrumbs, menus } = this.state;
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
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  categoryCode: PropTypes.string
}
export default Category;