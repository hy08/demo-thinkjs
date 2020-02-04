import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { split } from 'lodash';
import Link from 'umi/link';
import router from 'umi/router';
import classnames from 'classnames';
import styles from './index.less';

const GotoType = {
  product: 1,
  device: 2
};
const PhotoList = [
  require('./unnamed1.png'),
  require('./unnamed2.png'),
  require('./unnamed3.png'),
  require('./unnamed4.png'),
  require('./unnamed5.png'),
  require('./unnamed6.png'),
];
const KehuList = [
  require('./kehu1.png'),
  require('./kehu2.png'),
  require('./kehu3.png'),
  require('./kehu4.png'),
  require('./kehu5.png'),
  require('./kehu6.png'),
];
@connect(() => ({}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categorys: [],
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
          this.setState({ devices: data.data })
        }
      }
    })
  }
  gotoDetail = (type, code) => {
    if (type === GotoType.product) {
      router.push('/products/' + code);
    } else {
      router.push('/devices/' + code);
    }
  }
  render() {
    const { products, devices } = this.state;
    return (
      <div className={styles.container}>
        <div className={classnames(styles.section)}>
          <div className={styles.header}>
            <p>园区剪影</p>
            <p><span className={styles.blueColor}>P</span>ark <span className={styles.blueColor}>S</span>ilhouette</p>
          </div>
          <div className={classnames(styles.self, styles.photoList)}>
            {PhotoList.map(photo => {
              return <img key={photo} src={photo} alt='剪影' />
            })}
          </div>
          <div className={styles.sectionLine}></div>
        </div>
        <div className={classnames(styles.section, styles.section1)}>
          <div className={styles.header}>
            <p>关于三艺强</p>
            <p><span className={styles.blueColor}>P</span><span>ROFILE</span></p>
          </div>
          <div className={styles.intro}>
            <p>我司是一家专业印刷定制不干胶标签的印刷厂，我厂主要生产不干胶标签，条码，二维码 贴纸，货运标签，价格卡，流水号标签，空白标签 等纸类不干胶产品，同时，我司还提供各种说明书，表单 ，送货单，包装彩盒（卡）等印刷，模切服务并提供最优惠的价格。</p>
            <p>经营项目： 1、黑白彩色印刷各种不干胶标签、条形，二维码产品等专用标签。 2、代客加工：各类PVC,PET, PI, MAYLAR 材料模切成型及印刷服务。3、自动贴标机 / 卷筒标签印刷 / 产品印刷服务.</p>
            <p>公司拥有一批专业的印刷技术人才，专业检测仪器及全自动化的印刷设备，从产品设计、到投入生产，每个环节都严格品质把关。</p>
            <p>秉承着顾客至上，科技创新的宗旨，满足客户的需求是我们工作的第一目标，欢迎广大客户惠顾！ </p>
          </div>
          <div className={styles.self}>
            <div>
              <p className={styles.countWrap}>
                <span>20</span><span>年</span>
              </p>
              <p className={styles.label}>丰富的行业经验</p>
            </div>
            <div>
              <p className={styles.countWrap}>
                <span>17</span><span>名</span>
              </p>
              <p className={styles.label}>伙伴忠诚为您服务</p>
            </div>
            <div>
              <p className={styles.countWrap}>
                <span>500</span><span>平方米</span>
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
            {
              products.map(product => {
                return (
                  <div className={styles.photoWrap} key={product.category_code}
                    onClick={() => { this.gotoDetail(GotoType.product, product.category_code) }}
                    style={{ backgroundImage: `url(${window.location.origin + split(product.pics, ',')[0]})` }}>
                    <div className={styles.cover}>
                      <p className={styles.coverTitle} title={product.name}>{product.name}</p>
                      <p className={styles.coverContent} title={product.intro}>{product.intro}</p>
                    </div>
                  </div>
                )
              })
            }
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
            <p>专业检测仪器及全自动化的印刷设备，从产品设计、到投入生产，每个环节都严格品质把关。</p>
          </div>
          <div className={styles.self}>
            {devices.map(device => {
              return (
                <div className={styles.photoWrap} key={device.id}
                  onClick={() => { this.gotoDetail(GotoType.device, device.id) }}
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
          <div className={styles.sectionLine}></div>
        </div>
        <div className={classnames(styles.section)}>
          <div className={styles.header}>
            <p>主要客户</p>
            <p><span className={styles.blueColor}>M</span>ain <span className={styles.blueColor}>C</span>ustomers</p>
          </div>
          <div className={classnames(styles.self, styles.kehuList)}>
            {KehuList.map(kehu => {
              return <img key={kehu} src={kehu} alt='客户' />
            })}
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