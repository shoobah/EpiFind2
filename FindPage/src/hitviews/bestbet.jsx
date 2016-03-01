import Radium from 'radium'
import React from 'react'
import Config from 'config'
import Excerpt from './parts/excerpt'
import Styles from '../style/hitListStyle'
import Breadcrumb from './parts/breadcrumb'


export default Radium(({key, hit, id}) => {
    const decodeHtml = function(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    return (
        <div key={key + 'v'} style={[Styles.hitBase, Styles.bestBetBox]}>
            <a key={key + 'a1'} style={Styles.title} href={Config.pathPrefix + hit.Url}>
                <div key={'hitIcon-' + id} style={Styles.hitIcon}>
                    <img style={[Styles.iconImg, Styles.searchhiticon]} src={Config.pathPrefix + '/images/Find/BB/' + hit.HitTypeName + '.png'} />
                </div>
            </a>
            <div style={Styles.hitContent}>
                <a key={key + 'a2'} style={Styles.title} href={Config.pathPrefix + hit.Url}>{hit.Title}</a><br/>
                <a key={key + 'a3'} style={Styles.title} href={Config.pathPrefix + hit.Url}><Excerpt excerpt={decodeHtml(hit.Excerpt) } key={'exc' + id}/></a>
            </div>
        </div>
    )
})
