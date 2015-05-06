/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react'; // eslint-disable-line no-unused-vars
import './EX2Browser.less';
import TransientTxt from '../TransientTxt';

class EX2Browser extends React.Component{
  constructor(props) {
    super(props);
    this.state = {id: 1};
    this.nextItem = this.nextItem.bind(this);
  }
  nextItem() {
    this.setState({id: this.state.id+1});
    console.log('incremented id to ' + this.state.id);
  }
  render() {
    return (
      <div className="EX2Browser">
        <div className="EX2Browser-container">
          <p onClick={this.nextItem}>
            Next Text
          </p>
          <TransientTxt sourceId = {this.state.id} />
        </div>
      </div>
    )
  }
}

export default EX2Browser;
