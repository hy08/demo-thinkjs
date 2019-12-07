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
        { name: '公司简介', href: '/about/1' },
        { name: '品牌文化', href: '/about/2' }
      ],
      companyName: '',
      contentType: props.match.params.id
    };
  };
  componentDidMount() {
    this.setMyBreadcrumb();
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.match.params, this.props.match.params)) {
      this.setState({ contentType: this.props.match.params.id }, () => {
        this.setMyBreadcrumb();
      });
    }
  }
  setMyBreadcrumb = () => {
    const { contentType } = this.state;
    const links = [];
    switch (contentType) {
      case CONTENT_TYPE.INTRO:
        links.push({ name: '公司简介', href: '/about/1' })
        break;
      default:
        links.push({ name: '品牌文化', href: '/about/2' })
        break;
    }
    this.setState({ links });
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
            <span className={styles.companyName}>{name}</span>成立于1995年，至今有24年历史，位于江苏省昆山市（毗邻上海市），现有员工180名，三年以上员工占比80%，占地4万平方米，建有现代化标准厂房2万平方米以及2万平方的智能化工厂，主要产品: 单卡盒 、精裱盒、手提纸袋、瓦楞彩盒、说明书等。拥有专业设计 – 快速打样 – 个性化定制 –智能化制造及物流系统等行业优势.
          </p>
          <p>科望在成长道路上一直走在行业前言，紧跟国际一流企业脚步和需求，科望是周边印刷界内第一家开发ERP管理、第一家引进CTP制版、第一家引进UV6+1印刷机、第一家引进UV8+1印刷机、第一家引进ESKO印前软件、第一家引进HP Indigo数码印刷机、第一家引进亚洲最先进的UV冷烫双上光九色印刷机的民营印刷高企。</p>
          <p>2018年科望工业4.0模式的智能工厂建成。六千库位智能立体仓库，2018年6月更是迎来了印刷界终极利器“亚洲一号”：曼罗兰9+2即亚洲最先进的UV冷烫双上光九色印刷机，打造世界级高端智能包装印刷综合体。</p>
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
          <p>"两聚两高"愿景：通过聚力创新、聚焦质量及服务营销，成为世界级品牌客户高度信赖的精品包装合作伙伴及内部员工高成长平台。</p>
          <p>我们坚持：一切以客户满意为宗旨的工作理念。</p>
          <p>我们坚持：一切以团队成长为目标的发展理念。</p>
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