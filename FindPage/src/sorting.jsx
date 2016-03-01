import React from 'react'
import Lang  from './config/lang.json'

class Sorting extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    let local          = Lang[this.props.lang]
    let dateOrderStyle = {}
    let relOrderStyle  = {}
    
    if(this.props.isDateOrder){
      dateOrderStyle = {
        fontWeight:    'bold',
        textTransform: 'capitalize'
      }
      relOrderStyle = {
        fontWeight:    'normal',
        textTransform: 'capitalize'
      }
    } else {
      dateOrderStyle = {
        fontWeight:    'normal',
        textTransform: 'capitalize'
      }
      relOrderStyle = {
        fontWeight:    'bold',
        textTransform: 'capitalize'
      }
    }
    return(
    <div style={{paddingBottom:'5px'}}>
      <input type="button" style={relOrderStyle} value={local.relevance} onClick={this.props.handleSort.bind(this, '')} />&nbsp;
      <input type="button" style={dateOrderStyle} value={local.date} onClick={this.props.handleSort.bind(this, 'date')} />
    </div>
  )
  }
}

export default Sorting;
