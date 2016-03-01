import React, { PropTypes }    from 'react'
import { connect }             from 'react-redux'
import { doSearch, setFilter } from './data/actionCreators'
import Lang                    from './config/lang.json'

class QueryFilter extends React.Component {
  constructor( props) {
    super(props)
  }

  categoryButtons() {
      let cats = this.props.cats
      let ret = []
      if(cats){
            cats.map((item, index) => {
                ret.push(
                    <span key={'cattype' + index}>
                        <input type="radio" name="type" onChange={this.props.handler.bind(this, item, [])}/> {item}<br/>
                    </span>
                )
             }
          )
      }
      return ret;
  }

  render() {
    let localized = Lang[this.props.lang]
    return (
    <div style={this.props.style}>
      <h3>{localized.category}</h3>
      <input type="radio" name="type" defaultChecked={true} onChange={this.props.handler.bind(this)}/> {localized.all}<br/>
      {this.categoryButtons()}
    </div>
    )
    }
}

function mapStateToProps (state) {
  return {
    cats: state.cats
  }
}

export default connect(mapStateToProps)(QueryFilter)
