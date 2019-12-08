import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { split } from 'lodash';
import Link from 'umi/link';
import classnames from 'classnames';
import styles from './index.less';

@connect(() => ({}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      devices: []
    }
  };
  componentDidMount() {
    const { dispatch } = this.props;
    // 获取三个类别的第一个商品信息
    dispatch({
      type: 'model/getProducts',
      payload: {
        data: {
          index: true
        },
        success: data => {
          this.setState({ products: data })
        }
      }
    })
    //获取三个设备信息
    dispatch({
      type: 'model/getDevices',
      payload: {
        data: {
          current: 0,
          pageSize: 3
        },
        success: data => {
          this.setState({ devices: data })
        }
      }
    })
  }
  render() {
    const { products, devices } = this.state;
    return (
      <div className={styles.container}>
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
          <div className={styles.linkWrap}>
            {LinkBotton({ url: '/about/1', title: '了解更多' })}
          </div>
          <div className={styles.sectionLine}></div>
        </div>
        <div className={classnames(styles.section, styles.section2)}>
          <div className={styles.header}>
            <p>产品展示</p>
            <p><span className={styles.blueColor}>P</span>RODUCT</p>
          </div>
          <div className={classnames(styles.intro, styles.center)}>
            <p>拥有专业设计 – 快速打样 – 个性化定制 –智能化制造及物流系统等行业优势，</p>
            <p>为客户提供专业、快速、低成本、高品质的产品包装加工一站式服务。</p>
          </div>
          <div className={styles.self}>
            {products.map(product => {
              return (
                <div className={styles.photoWrap} key={product.category_code}
                  style={{ backgroundImage: `url(${window.location.origin + split(product.pics, ',')[0]})` }}>
                  <div className={styles.cover}>
                    <p className={styles.coverTitle} title={product.name}>{product.name}</p>
                    <p className={styles.coverContent} title={product.intro}>{product.intro}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.linkWrap}>
            {LinkBotton({ url: '/products', title: '了解更多' })}
          </div>
          <div className={styles.sectionLine}></div>
        </div>
        <div className={classnames(styles.section, styles.section2)}>
          <div className={styles.header}>
            <p>设备展示</p>
            <p><span className={styles.blueColor}>E</span>QUIPMENT</p>
          </div>
          <div className={classnames(styles.intro, styles.center)}>
            <p>UV印刷机主要应用于：金、银卡、PET、PVC等材料的印刷；</p>
            <p>主要生产产品：高档化妆品盒、高档礼盒、精装盒，手提袋等；</p>
            <p>印刷特点：多色、高效、环保，联机UV逆向可以组合三十种效果。</p>
          </div>
          <div className={styles.self}>
            {devices.map(device => {
              return (
                <div className={styles.photoWrap} key={device.id}
                  style={{ backgroundImage: `url(${window.location.origin + split(device.pics, ',')[0]})` }}>
                  <div className={styles.cover}>
                    <p className={styles.coverTitle} title={device.name}>{device.name}</p>
                    <p className={styles.coverContent} title={device.intro}>{device.intro}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.linkWrap}>
            {LinkBotton({ url: '/devices', title: '了解更多' })}
          </div>
        </div>
      </div>
    );
  }
}

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

export default Index;