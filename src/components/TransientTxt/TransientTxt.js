/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import './TransientTxt.less';

class TransientTxt extends React.Component{
  constructor(props) {
    super(props);
    this.loadText = this.loadText.bind(this);
  }

  loadText() {
    let prefix = this.props.isSvg ? 'svg' : 'text';
    let source = 'module1/'+ prefix +' (' + this.props.sourceId + ').txt';
    console.log('will load text from: ' + source);
    var newTxt=$.ajax({
      type: "GET",
      url: source,
      async: false
    }).responseText;
    //console.log('loaded: ' + newTxt);
    if (this.props.isSvg) {
      newTxt = '<svg> ' + newTxt + '</svg>';
    }
    return newTxt;
  }

  render() {
    var myText = {__html: this.loadText()};
    return (
      <div className="TransientTxt" dangerouslySetInnerHTML={myText} />
    )
  }
}
TransientTxt.defaultProps = {sourceId : 1,  isSvg: false};

export default TransientTxt;
