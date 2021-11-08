import React from 'react'
import './Contacts.scss'

export function Contacts() {
    return (
        <div className="contacts-wrapper">
            {/* <div className="planet"></div> */}
            <div className="media-contacts">
                <a className="github" href="https://github.com/ViktorM"></a>
                <a className="mail" href=""></a>
                <a className="twitter" href="https://twitter.com/viktor_m81"></a>
                <a className="facebook" href="https://www.facebook.com/viktor.makoviychuk"></a>
            </div>
            <a
                className="linkedin"
                href="https://www.linkedin.com/in/makoviychuk-viktor-9199988/"
            />
            <div className="background-ball" />
        </div>
    )
}
