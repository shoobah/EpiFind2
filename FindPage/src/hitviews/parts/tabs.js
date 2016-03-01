import React from 'react'
import Config from 'config'
import Radium from 'radium'
import Styles from '../../style/searchInputStyle'

export default Radium(({tabList, handleTabClick, pagetotal, doctotal}) => {
    return (
        <div>
            {tabList.map((item, index) => {
                let sum = ''
                if(doctotal && pagetotal && item.Type===''){
                    let alltotal = pagetotal + doctotal
                    sum = '(' + alltotal + ')'
                }
                if (doctotal && item.Type === 'doc') {
                    sum = '(' + doctotal + ')'
                }
                if (pagetotal && item.Type === 'page') {
                    sum = '(' + pagetotal + ')'
                }
                let styleList = [Styles.tab, Styles.bottomTab]
                if (item.IsActive) styleList.push(Styles.bottomTabActive)
                return (
                    <div key={'tab-' + index} style={styleList} onClick={handleTabClick.bind(this, item.Type) } >{item.Name} {sum}</div>
                )
            }) }
        </div>
    )
})