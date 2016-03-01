import React, { PropTypes } from 'react'
import Lang  from './config/lang.json'

class Age extends React.Component {
    render() {
        let local = Lang[this.props.lang]
        return (
            <div>
                <h3>{local.updated}</h3>
                <input type="radio" name="age" defaultChecked={true} onChange={this.props.handler.bind(this) }/> {local.anytime}<br/>
                <input type="radio" name="age" onChange={this.props.handler.bind(this, 'week') }/> {local.lastWeek}<br/>
                <input type="radio" name="age" onChange={this.props.handler.bind(this, 'month') }/> {local.lastMonth}<br/>
                <input type="radio" name="age" onChange={this.props.handler.bind(this, 'year') }/> {local.lastYear}<br/>
            </div>
        )
    }
}

export default Age
