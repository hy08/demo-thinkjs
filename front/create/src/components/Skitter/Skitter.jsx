import React from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import classnames from 'classnames';
import $ from 'jquery';
import styles from './Skeiter.less';

class Skitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };
  componentDidMount() {
    $(function () {
      $('.skitter').skitter({
        interval: 3000,
        velocity: 0.8,
      });
    });
  }
  render() {
    const { imgUrlList, isIndex } = this.props;
    const lis = imgUrlList.map(url => {
      return (
        <li key={url}>
          <a href='javascript:void(0)' className={styles.banner}>
            <img src={url} className='cubeShow' />
          </a>
        </li>
      )
    })
    return (
      <div className={classnames('skitter', styles.skitter, { [styles.isIndex]: isIndex })}>
        <ul>
          {lis}
        </ul>
      </div>
    );
  }
};
Skitter.propTypes = {
  isIndex: PropTypes.bool,
  imgUrlList: PropTypes.array
}

export default Skitter;
