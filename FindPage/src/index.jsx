import 'babel-core/polyfill' // Får Object.assign att lira i applikationen
import React      from 'react'
import ReactDOM   from 'react-dom'
import {Provider} from 'react-redux'
import App        from './app'
import store      from './data/findstore'
import {StyleRoot} from 'radium'

let el = document.getElementById('root')

let htmlEl = document.getElementById('HtmlElement')

ReactDOM.render(
    <Provider store={store}>
        <StyleRoot>
            <App
                lang={htmlEl.getAttribute('lang') }
                mediafiles={el.getAttribute('data-mediafiles') }
                connectors={el.getAttribute('data-connectors') }
                searchroot={el.getAttribute('data-searchroot') }
                searchlanguage={el.getAttribute('data-searchlanguage') }
                searchtabs={el.getAttribute('data-tablist') }
                basecolor={el.getAttribute('data-basecolor') }
                findURL={el.getAttribute('data-findurl')}
                />
        </StyleRoot>
    </Provider>, el
)
