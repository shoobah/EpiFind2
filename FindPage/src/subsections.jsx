import React, { PropTypes }    from 'react'
import { connect }             from 'react-redux'
import { doSearch, setFilter } from './data/actionCreators'

class Subsections extends React.Component {
  constructor( props) {
    super(props)
  }

  render() {
    return (
    <div style={this.props.style}>
      <h3>Sektion</h3>
      <input type="radio" name="subsection" defaultChecked={true} onChange={this.props.handler.bind(this,'')}/> Alla<br/>
      <input type="radio" name="subsection" onChange={this.props.handler.bind(this, 'Nyheter')}/> Nyheter<br/>
      <input type="radio" name="subsection" onChange={this.props.handler.bind(this, 'Webbredaktionen')}/> Webbredaktionen<br/>
      <input type="radio" name="subsection" onChange={this.props.handler.bind(this, 'Vårdgivarportalen')}/> Vårdgivarportalen<br/>
    </div>
    )
  }
}

export default Subsections
