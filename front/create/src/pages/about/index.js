import React from 'react';
import { connect } from 'dva';
import { isEqual } from 'lodash';
import MyBreadcrumb from '../../components/MyBreadcrumb';
import MyMenu from '../../components/MyMenu';
import styles from './index.less';

const CONTENT_TYPE = {
  INTRO: '1',
  CULTURE: '2',
}
const photoList = [
  { url: require('./1.png'), label_1: 'Knowledge', label_2: '我们崇尚知识' },
  { url: require('./2.png'), label_1: 'enthusiasm', label_2: '我们充满热情' },
  { url: require('./3.png'), label_1: 'Value', label_2: '我们创造价值' },
  { url: require('./4.png'), label_1: 'Art', label_2: '我们做艺术品' }
]

@connect(({ model }) => ({
  company: model.company
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      menus: [
        { name: '公司简介', href: '/about/1', current: false, type: CONTENT_TYPE.INTRO },
        { name: '品牌文化', href: '/about/2', current: false, type: CONTENT_TYPE.CULTURE }
      ],
      companyName: '',
      contentType: props.match.params.id
    };
  };
  componentDidMount() {
    this.setMyBreadcrumbAndMenus();
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.match.params, this.props.match.params)) {
      this.setState({ contentType: this.props.match.params.id }, () => {
        this.setMyBreadcrumbAndMenus();
      });
    }
  }
  setMyBreadcrumbAndMenus = () => {
    const { contentType, menus } = this.state;
    const links = [];
    switch (contentType) {
      case CONTENT_TYPE.INTRO:
        links.push({ name: '公司简介', href: '/about/1' });
        break;
      default:
        links.push({ name: '品牌文化', href: '/about/2' })
        break;
    }
    let menu = menus.find(menu => menu.type === contentType);
    if (menu) {
      menu.current = true;
    }
    this.setState({ links, menus: [...menus] });
  }
  renderHeader = () => {
    return (
      <div className={styles.header}>
        <header>三艺强印刷</header>
        <p>KEVA</p>
      </div>
    )
  }
  //渲染公司简介
  renderCompanyProfile = () => {
    const { name } = this.props.company;
    return (
      <>
        {this.renderHeader()}
        <div className={styles.introContent}>
          <p>
            <span className={styles.companyName}>{name}</span>是一家专业印刷定制不干胶标签的印刷厂，我厂主要生产不干胶标签，条码，二维码 贴纸，货运标签，价格卡，流水号标签，空白标签 等纸类不干胶产品，同时，我司还提供各种说明书，表单 ，送货单，包装彩盒（卡）等印刷，模切服务并提供最优惠的价格。
          </p>
          <p>经营项目： </p>
          <ul>
            <li>1、黑白彩色印刷各种不干胶标签、条形，二维码产品等专用标签。</li>
            <li>2、代客加工：各类PVC,PET, PI, MAYLAR 材料模切成型及印刷服务。</li>
            <li>3、自动贴标机 / 卷筒标签印刷 / 产品印刷服务。</li>
          </ul>
          <br />
        </div>
      </>
    )
  }
  //渲染品牌文化
  renderCompanyCulture = () => {
    return (
      <>
        {this.renderHeader()}
        <div className={styles.cultureContent}>
          <p>公司拥有一批专业的印刷技术人才，专业检测仪器及全自动化的印刷设备，从产品设计、到投入生产，每个环节都严格品质把关。</p>
          <p>秉承着顾客至上，科技创新的宗旨，满足客户的需求是我们工作的第一目标，欢迎广大客户惠顾！ </p>
          <div className={styles.photoWrap}>
            {photoList.map(photo => {
              return (
                <div key={photo.label_1} className={styles.photo}>
                  <img src={photo.url} alt={photo.label_1} />
                  <span>{photo.label_1}</span>
                  <span>{photo.label_2}</span>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
  render() {
    const { links, menus, contentType } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.headerNav}>
          <MyBreadcrumb links={links} />
          <MyMenu menus={menus} />
        </div>
        <div className={styles.content}>
          {contentType === CONTENT_TYPE.INTRO ? this.renderCompanyProfile() : this.renderCompanyCulture()}
        </div>
      </div>
    );
  }
}
export default Index;