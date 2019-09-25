import React, { Fragment } from 'react';
import { connect } from "dva";
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Button } from 'antd';
import moment from 'moment';
import classnames from 'classnames';
import styles from './Footer.less';

class Footer extends React.Component {
  static defaultProps = {

  }
  constructor(props) {
    super(props);
    this.state = {
    };
  };
  render() {
    return (
      <Fragment>
        <Button>Footer</Button>
        <p>{moment().format('YYYY-MM-DD')}</p>
      </Fragment>
    );
  };
};
Footer.propTypes = {
}
function mapStateToProps(state) {
  return {};
};
export default connect(mapStateToProps)(Footer);