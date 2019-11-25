import React from 'react';
import { Icon } from 'antd';
import Skitter from '../../components/Skitter/Skitter';
import Link from 'umi/link';
import classnames from 'classnames';
import styles from './index.less';

function LinkBotton(props) {
  return (
    <Link className={styles.linkBotton}
      to={props.url}>
      <div className={styles.btnContent}>
        <Icon type='link' className={styles.icon} />
        <span className={styles.btnTitleText}>{props.title}</span>
      </div>
    </Link>
  )
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [
        require('./index_banner01.jpg'),
        require('./index_banner02.jpg'),
        require('./index_banner03.jpg')
      ],
    };
  };
  componentDidMount() {
    // 请求数据
  }
  render() {
    const { bannerList } = this.state;
    return (
      <div className={styles.container}>
        <Skitter isIndex={true} imgUrlList={bannerList} />
        <div className={classnames(styles.section, styles.section1)}>
          <div className={styles.header}>
            <p>关于三艺强</p>
            <p><span className={styles.blueColor}>P</span><span>ROFILE</span></p>
          </div>
          <div className={styles.intro}>
            <p>我司成立于1995年，至今有24年历史，位于江苏省昆山市（毗邻上海市），现有员工180名，三年以上员工占比80%，占地4万平方米，建有现代化标准厂房2万平方米以及2万平方的智能化工厂，主要产品 : 单卡盒 、精裱盒、手提纸袋、瓦楞彩盒、说明书等。拥有设计 – 快速打样 – 个性化定制 –智能化制造及物流系统等行业优势，打造世界级高端智能包装印刷综合体。</p>
            <p>"两聚两高"愿景：通过聚力创新、聚焦质量及服务营销，成为世界级品牌客户高度信赖的精品包装合作伙伴及内部员工高成长平台。</p>
          </div>
          <div className={styles.self}>
            <div>
              <p className={styles.countWrap}>
                <span>24</span><span>年</span>
              </p>
              <p className={styles.label}>丰富的行业经验</p>
            </div>
            <div>
              <p className={styles.countWrap}>
                <span>180</span><span>名</span>
              </p>
              <p className={styles.label}>伙伴忠诚为您服务</p>
            </div>
            <div>
              <p className={styles.countWrap}>
                <span>40000</span><span>平方米</span>
              </p>
              <p className={styles.label}>现代化工业标准厂房</p>
            </div>
          </div>
          {LinkBotton({ url: '/about', title: '了解更多' })}
          <div className={styles.sectionLine}></div>
        </div>
      </div>
    );
  }
}
export default Index;