import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'panic-overlay' // TODO: disable in production (conditional import?)

import { Main } from '~/Main'

export function App() {
    return (
        <>
            <Router>
                <AppContent />
            </Router>
        </>
    )
}

function AppContent() {
    return (
        <>
            {/* <Topbar /> */}
            <div className="page">
                <Route path="/" exact component={Main} />
            </div>
        </>
    )
}

// function makePage(Content: React.JSXElementConstructor<Record<string, unknown>>) {
//     function Page(props: Record<string, unknown>) {
//         // const { isMobile } = useAppContext()

//         props = { ...props }

//         return (
//             <>
//                 <Content {...props} />
//             </>
//         )
//     }

//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     return (props: any) => <Page {...replaceAllWithUndefined(props.match.params)} />
// }

// function replaceAllWithUndefined(props: Record<string, unknown>) {
//     for (const k in props) {
//         if (props[k] === 'all') props[k] = undefined
//     }
//     return props
// }
