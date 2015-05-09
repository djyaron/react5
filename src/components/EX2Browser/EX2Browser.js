/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react'; // eslint-disable-line no-unused-vars
import './EX2Browser.less';
import SVGGroups from '../SVGGroups';
import TransientTxt from '../TransientTxt';

class EX2Browser extends React.Component{
  constructor(props) {
    super(props);
    this.state = {id: 1, visible: [1]};
    this.nextItem = this.nextItem.bind(this);
  }
  nextItem() {
    let newID = this.state.id +1;
    let newVis = this.state.visible.slice();
    newVis.push(newID);
    this.setState({
          id: newID,
          visible: newVis
        });
  console.log('incremented id to ' + this.state.id);
}
  render() {
    //let visibleItems = this.state.visible.map(function(vis){
    //  return <TransientTxt sourceId={vis} isSvg="1" />;
    //});
    return (
      <div className="EX2Browser">
        <div className="EX2Browser-container">
          <p onClick={this.nextItem}>
            Next
          </p>
          <SVGGroups sourceIds={this.state.visible} />
          <TransientTxt sourceId={this.state.id} />
        </div>
      </div>
    )
  }
}

export default EX2Browser;
