
import React, { Component } from 'react';
import { Button } from 'antd'
class add_update extends Component {
  render() {
    return (
      <div>
        addupdate { this.props.match.params.id }
        <Button onClick={() => {this.props.history.go(-1)} }>Back</Button>
      </div>
    );
  }
}

export default add_update;