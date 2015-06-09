/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import './SVGItem.less';

class SVGItem extends React.Component{
  constructor(props) {
    super(props);
    this.loadGroup = this.loadGroup.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  loadGroup(groupId) {
    let source = 'module1/svg (' + groupId + ').txt';
    console.log('will load svg group from: ' + source);
    var newGroup=$.ajax({
      type: "GET",
      url: source,
      async: false
    }).responseText;
    return newGroup;
  }
  componentDidMount() {
    let domElement =  React.findDOMNode(this);
    let rect = domElement.getBoundingClientRect();
    console.log('SVGItem top '+rect.top+' left '+rect.left+' bottom'+rect.bottom
        +' right '+rect.right +' height '+rect.height);
  }

  render() {
    //let svgText ='<svg width={this.props.width} height={this.props.height}> ';
    let svgText = '';
    this.props.sourceIds.map(function(vis){
      svgText = svgText + " " + this.loadGroup(vis);
    }.bind(this));
    //svgText = svgText + " </svg> "
    let myText = {__html: svgText};
    return (
      <svg className="SVGItem" x="247" y="200" width={this.props.width} height={this.props.height}
           dangerouslySetInnerHTML={myText} />
    )
  }
}
SVGItem.defaultProps = {
  sourceIds : [1],
  dims : {x: 1, y:1, width: 1024, height:400}
};

export default SVGItem;
