import React from 'react'
import Config from 'config'
import Radium from 'radium'
import Styles from '../../style/hitListStyle'

function getLinkList(from, to, goto, total){
    let pages = Math.ceil(total / 10)
    let currentPage = Math.floor(from / 10) + 1
    let links = []
    let start = 1
    let nroflinks = 10
    if(pages>10)
    {
        if(currentPage > 5)
        { 
            if(currentPage + 10 <= pages)
                start = currentPage - 5
            else
                start = pages - 9
        }
    }
    else{
        nroflinks = pages
    }
    //console.log(currentPage, from , to, pages, start)
    for(var i=start, j=1; j<=nroflinks; i++, j++)
    {
        if(i===currentPage)
            links.push(<span key={'li' + i} style={Styles.hitLinkCurrent} >{i}</span>)
        else
            links.push(<span onClick={goto.bind(this, i)} key={'li' + i} style={Styles.hitLink} >{i}</span>)
    }
    return <div style={Styles.hitLinkContainer}>{links}</div>
}

export default Radium(({from, to,goto,  total}) => {
  return(getLinkList(from, to, goto, total))
})
