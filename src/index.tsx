import React from 'react'
import ReactDom from 'react-dom'
import panic from 'panic-overlay'
panic.configure({ projectRoot: '/Users/new/vityaz' })

// import './fonts.css'
import './reset.css'
import './index.scss'

import { App } from './App'

ReactDom.render(<App />, document.getElementById('root'))
