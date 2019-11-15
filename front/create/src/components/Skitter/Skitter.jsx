import React from 'react';
import Link from 'umi/link';
import $ from 'jquery';

class Skitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };
  componentDidMount() {
    $(function () {
      // $('.skitter-large').skitter();
      console.log($)
    });
  }
  render() {
    return (
      <div class="skitter skitter-large">
        <ul>
          <li>
            <Link to="/"><img src={require('./index_banner01.jpg')} class="cut" /></Link>
            <div class="label_text"><p>cut</p></div>
          </li>
          <li>
            <Link to="/"><img src={require('./index_banner02.jpg')} class="cut" /></Link>
            <div class="label_text"><p>swapBlocks</p></div>
          </li>
          <li>
            <Link to="/"><img src={require('./index_banner03.jpg')} class="cut" /></Link>
            <div class="label_text"><p>swapBarsBack</p></div>
          </li>
        </ul>
      </div>
    );
  }
};
export default Skitter;