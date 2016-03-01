import React from 'react'
import ReactDOM from 'react-dom'
import Radium from 'radium'
import Styles from '../../style/searchInputStyle'

@Radium
class QueryText extends React.Component {
    constructor(props){
        super(props)
    }
    handleClick(e){
        this.refs.textBox.select()
    }

    render(){
        return(
            <input type="text" ref="textBox" style={Styles.searchInput} onBlur={this.props.handleBlur.bind(this)} value={this.props.query.Text} onChange={this.props.handleText.bind(this) } onFocus={this.props.handleText.bind(this) } onKeyDown={this.props.handleKeyPress.bind(this)}  />
        )
    }
}

export default QueryText
