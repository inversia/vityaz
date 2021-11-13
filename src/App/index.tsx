import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'panic-overlay' // TODO: disable in production (conditional import?)

import { ProvideAppContext } from './Context'
import { ProvideFullSizeContext } from '~components/FullSizeCarousel/Context'
// import { facebook } from '~icons'

import { Main, Research, VisualArt, Music, Contacts } from '~pages/'
import { Menu, Player } from '~components/'

export function App() {
    return (
        <Router>
            <ProvideAppContext>
                <ProvideFullSizeContext>
                    <AppContent />
                </ProvideFullSizeContext>
            </ProvideAppContext>
        </Router>
    )
}

function AppContent() {
    return (
        <>
            <Menu />
            <div className="page">
                <Route path="/main" exact component={Main} />
                <Route path="/research" exact component={Research} />
                <Route path="/visual" exact component={VisualArt} />
                <Route path="/music" exact component={Music} />
                <Route path="/contacts" exact component={Contacts} />
            </div>
            <Player />
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
