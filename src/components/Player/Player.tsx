import React from 'react'
import './Player.scss'

export function Player() {
    return (
        <>
            <div className="player-background">
                {/* <div className="record-one"></div>
                <div className="record-two"></div> */}
            </div>
            <div className="record-one" onClick={() => alert('ЩА ВСЁ БУДЕТ!')}></div>
            <div className="record-two" onClick={() => alert('ЩА ВСЁ БУДЕТ!')}></div>
        </>
    )
}
