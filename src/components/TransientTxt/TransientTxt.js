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
    let source = 'module1/text (' + this.props.sourceId + ').txt';
    console.log('will load text from: ' + source);
    //$.get(source, function(result) {
    //  console.log('in callback '+ this.newTxt);
    //  this.newTxt = result;
    //  console.log('in callback 2 '+ this.newTxt);
    //  this.newTxt = result;
    //
    //}.bind(toSend));
    var newTxt=$.ajax({
      type: "GET",
      url: source,
      async: false
    }).responseText;
    console.log('loaded: ' + newTxt);
    return newTxt;
  }

  render() {
    var myText = this.loadText();
    return (
      <div className="TransientTxt">
        <div className="TransientTxt-container">
          <p> {myText} </p>
        </div>
      </div>
    )
  }
}
TransientTxt.defaultProps = {sourceId : 1 };

export default TransientTxt;
