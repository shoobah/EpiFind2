import React from 'react'
import Radium from 'radium'
import Config from 'config'
import Icon from './parts/icon'
import Excerpt from './parts/excerpt'
import PageBreadcrumbs from './parts/pageBreadcrumbs'
import Styles from '../style/hitListStyle'
import Lang from '../config/lang.json'

export default Radium(({hit, id, lang, key}) => {
    let local = Lang[lang]
    return (
    <div key={key + 'v'} style={Styles.hitBase} data-type={hit.TypeName}>
        <a href={Config.pathPrefix + hit.Url} target="_blank">
            <div key={'hitIcon-' + id} style={Styles.hitIcon}>
                <Icon ext={hit.FileExtension} />
            </div>
            <div style={Styles.hitContent}>
                <span style={Styles.title} dangerouslySetInnerHTML={{__html:hit.Title}}>
                </span>
                <Excerpt excerpt={hit.Excerpt} key={'exc' + id}/>
            </div>
        </a>
         <div key={key + 'v'} style={Styles.breadcrumbheadline}>{local.documentexistson}</div>
        <PageBreadcrumbs list={hit.PageBreadcrumbs} />
    </div>
)}) 
