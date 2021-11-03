import React from 'react'
import './Contacts.scss'

export function Contacts() {
    return (
        <div className="contacts-wrapper">
            <div className="planet"></div>
            <div className="contacts">
                <dl>
                    <dt>
                        Country: <dd>USA, California, San-Francisco</dd>
                    </dt>
                    <dt>
                        Phone Number: <dd>+123424234566</dd>
                    </dt>
                </dl>
            </div>

            <div className="media-contacts">
                <a className="twitter" href=""></a>
                <a className="mail" href=""></a>
                <a className="facebook" href=""></a>
                <a className="github" href=""></a>
            </div>
            <a
                className="linkedin"
                href="https://www.linkedin.com/in/makoviychuk-viktor-9199988/"
            />
            <div className="background-ball" />
        </div>
    )
}
