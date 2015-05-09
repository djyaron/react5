/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import './SVGGroups.less';

class SVGGroups extends React.Component{
  constructor(props) {
    super(props);
    this.loadGroup = this.loadGroup.bind(this);
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

  render() {
    let svgText ='<svg width="1024" height="400"> ';
    this.props.sourceIds.map(function(vis){
      svgText = svgText + " " + this.loadGroup(vis);
    }.bind(this));
    svgText = svgText + " </svg> "
    let myText = {__html: svgText};
    return (
      <div className="SVGGroups" dangerouslySetInnerHTML={myText} />
    )
  }
}
SVGGroups.defaultProps = {sourceIds : [1]};

export default SVGGroups;
