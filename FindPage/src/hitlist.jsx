import React, { PropTypes } from 'react'
import Radium               from 'radium'
import { connect }          from 'react-redux'
import PageView             from './hitviews/page'
import WebContent           from './hitviews/webContent'
import DocView              from './hitviews/doc'
import DefaultView          from './hitviews/default'
import BestBetView          from './hitviews/bestbet'
import Lang                 from './config/lang.json'
import Paging               from './hitviews/parts/paging'
import Styles               from './style/hitListStyle'

export default Radium(({hits, total, query, status, handleBackward, handleForward, handleGoto,  lang, message}) => {
    let local = Lang[lang]

    if (status === 'success' && !query) {
        return (
            <div className="col-sm-8" style={Styles.nohitStyle}>
                {local.noQuery}
            </div>
        )
    }

    if (status === 'failed') {
        return (
            <div key="failBox" style={Styles.failStyle}>
                <h1>local.couldNotSearch</h1>
                <span>{message.message}</span>
            </div>
        )
    }

    let orderText = local.relevance
    if (query.Order === 'date') {
        orderText = local.date
    }

    if (hits) {
        if (hits.length === 0 && status === 'success') {
            return (
                <div className="find-result" style={Styles.nohitStyle}>
                    <h3>{local.noHitsHeader}</h3>
                    {local.noHits}
                </div>
            )
        } else {
            let from = query.Skip + 1
            let to = query.Skip + query.Take
            if (to > total) {
                to = total
            }
            let containerStyle = Styles.listContainer
            if(status === 'fetching'){
                containerStyle = [Styles.listContainer, Styles.faded]
            }
            return (
                <div className="find-result" style={{ marginTop: '50px' }}>
                    <div style={containerStyle}>
                        {hits.map((hit, index) => {
                            if (hit.IsBestBet && hit.HasBestBetStyle) {
                                return <BestBetView key={'bb' + hit.Id} id={hit.Id} hit={hit}/>
                            }
                            switch (hit.HitTypeName) {
                                case 'generic':
                                    return <DocView key={'dw' + hit.Id } id={hit.Id} hit={hit} lang={lang}/>
                                case 'page':
                                    return <PageView key={'pw' + hit.Id } id={hit.Id} hit={hit} lang={lang} />
                                case 'webcontent':
                                    return <WebContent key={'wc' + hit.Id } id={hit.Id} hit={hit} lang={lang} />
                                default:
                                    return <DefaultView key={'dew' + hit.Id } id={hit.Id} hit={hit} lang={lang} />
                            }
                        })
                        }
                    </div>
                    <Paging from={from} to={to} lang={lang} back={handleBackward.bind(this) } fwd={handleForward.bind(this) } goto={handleGoto.bind(this) } total={total} status={status}/>
                </div>
            )
        }
    }
})
