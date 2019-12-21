import React from 'react';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';
import Slider from 'react-slick';
import { isEmpty, isEqual } from 'lodash';
import Link from 'umi/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './index.less';
import uuid from 'uuid';

export default class DetailIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPic: props.pics[0]
    };
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.pics, this.props.pics)) {
      this.setState({ currentPic: this.props.pics[0] })
    }
  }
  handlePicChange = (pic) => {
    this.setState({ currentPic: pic })
  }
  renderSlider = () => {
    const { pics, title } = this.props;
    return (
      pics.length > 2 ? <div className={styles.slider} style={{ width: '96%', paddingLeft: '30px' }}>
        <Slider {...{
          dots: false,
          swipe: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1
        }}>
          {pics.map(pic => {
            return <div className={styles.img} key={uuid()}>
              <img src={window.location.origin + pic} onClick={() => { this.handlePicChange(pic) }} alt={title} />
            </div>
          })}
        </Slider>
      </div> : <div className={styles.noSlider}>
          {pics.map(pic => {
            return <div className={styles.img} key={uuid()}>
              <img src={window.location.origin + pic} onClick={() => { this.handlePicChange(pic) }} alt={title} />
            </div>
          })}
        </div>
    )
  }
  renderIntro = () => {
    let { isProduct, title, category, intro } = this.props;
    return (
      <>
        <div>
          <span className={styles.label}>{isProduct ? '产品名称: ' : '设备名称: '}</span>
          <span className={styles.introTitle}>{title}</span>
        </div>
        {!isEmpty(category) ? <div>
          <span className={styles.label}>所属分类: </span>
          <span className={styles.introTitle}>
            <Link to={category.href}>{category.name}</Link>
          </span>
        </div> : null}
        <div>
          <span className={styles.label}>{isProduct ? '产品介绍: ' : '设备介绍: '}</span>
          <span className={styles.introContent}>{intro}</span>
        </div>
      </>
    );
  }
  render() {
    const { currentPic } = this.state;
    const { title } = this.props;
    return (
      <div className={styles.detailWrap}>
        <div className={styles.picWrap}>
          <ReactImageMagnify className={styles.imageMagnify}
            {...{
              smallImage: {
                alt: title,
                isFluidWidth: false,
                width: 600,
                height: 500,
                src: window.location.origin + currentPic
              },
              largeImage: {
                src: window.location.origin + currentPic,
                width: 1200,
                height: 1800,
              },
              enlargedImageContainerDimensions: {
                width: '60%',
                height: '60%'
              }
            }} />
          {this.renderSlider()}
        </div>
        <div className={styles.introWrap}>
          {this.renderIntro()}
        </div>
      </div>
    )
  }
}

DetailIntro.propTypes = {
  isProduct: PropTypes.bool.isRequired,
  pics: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }),
  intro: PropTypes.string.isRequired
}