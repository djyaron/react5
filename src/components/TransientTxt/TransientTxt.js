/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import './TransientTxt.less';

class TransientTxt extends React.Component{
  constructor(props) {
    super(props);
    this.state = {txt: 'initialText'};
  }

  componentDidMount() {
    let source = 'module1/text (' + this.props.sourceId + ').txt';
    console.log('will load text from: ' + source);
    $.get(source, function(result) {
      console.log('old text: ' + this.state.txt);
      let newTxt = result;
      console.log('loaded: ' + newTxt);
      this.setState({
        txt: newTxt
      });
    }.bind(this));
    console.log('new text: ' + this.state.txt);
  }

  render() {
    return (
      <div className="TransientTxt">
        <div className="TransientTxt-container">
          <p> {this.state.txt}</p>
        </div>
      </div>
    )
  }
}
TransientTxt.defaultProps = {sourceId : 1 };

export default TransientTxt;
