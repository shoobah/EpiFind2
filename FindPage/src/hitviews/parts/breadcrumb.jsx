import React from 'react'
import Radium from 'radium'
import Styles from '../../style/hitListStyle'

export default Radium(({breadcrumbs, links}) => {
    if(breadcrumbs){
        if(!links){
        return(
            <div key={'bc'} style={Styles.breadcrumb}>
                {breadcrumbs.map((item, index) => {
                return(
                    <span key={'bci' + item.Name + index} style={Styles.breadcrumbItem}>{item.Name} {index < breadcrumbs.length-1 ? '»':''} </span>
                )}
                )}
            </div>
        )}
        else
        {
            let r= []
            let llink = ''
            return(
                <div key={'bc'} style={Styles.breadcrumb}>
                {breadcrumbs.map((item, index) => {
                    llink = item.Url
                    r.push(item.Name +' ') 
                    r.push(index < breadcrumbs.length-1 ? '» ':'')
                }
            )}
            <a key={'a' + llink} href={llink} style={Styles.breadcrumbItem}> {r} </a>
            </div>
            )
        }
    }
    return <div></div>
})
