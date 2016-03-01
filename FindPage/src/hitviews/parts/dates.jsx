import React from 'react'
import Moment from 'moment'
import Lang from '../../config/lang.json'

const dateStyle = {
  borderTop:'solid 1px #dedede',
  color:'#666',
  marginTop: '10px'
}

export default ({hit, lang}) => {
  if(hit){
    let local=Lang[lang?lang:'sv'];
    let myDateFormat = 'L LT'
    let cr = Moment(hit.UpdateDate).format(myDateFormat)
    let ch = Moment(hit.PublishDate).format(myDateFormat)
    if(cr && ch){
      return(
        <div style={dateStyle} >
          <span>{local.published}: {ch}</span><br/>
          <span>{local.updated}: {cr}</span><br/>
        </div>
      )
    }
  }
  return <div>-</div>
}
