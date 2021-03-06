/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import './ContactPage.less';

class ContactPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {txt: 'initialText'};
  }

  componentDidMount() {
    $.get(this.props.source, function(result) {
      console.log('old text: ' + this.state.txt);
      console.log('will load text from: ' + this.props.source);
      let newTxt = result;
      console.log('loaded: ' + newTxt);
      this.setState({
        txt: newTxt
      });
    }.bind(this));
    console.log('new text: ' + this.state.txt);
  }

  render() {
    $.get();
    return (
      <div className="ContactPage">
        <div className="ContactPage-container">
          <p> {this.state.txt}</p>
        </div>
      </div>
    )
  }
}
ContactPage.defaultProps = {source: 'module1/text (1).txt'};

export default ContactPage;
