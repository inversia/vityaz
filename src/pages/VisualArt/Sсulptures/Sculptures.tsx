import React from 'react'
import { InfoBlock } from '~components'
import './Sculptures.scss'
// import { sculpture1, sculpture2, sculpture3, sculpture4 } from './images'

import _sculptures from './images/*.jpg'

const sculptures = Object.values(_sculptures as { [key: string]: string })

export function Sculptures() {
    return (
        <div className="sculptures-wrapper">
            <InfoBlock
                text="Не записывай человека в покойники, пока сам не увидел труп. И помни, что даже тогда можно ошибиться."
                index={1}
                picturesArray={sculptures}
            ></InfoBlock>
            <InfoBlock
                text="Страх убивает разум. Страх - это малая смерть, несущая забвение. Я смотрю в лицо моему страху, я дам ему овладеть мною и пройти сквозь меня. И когда он пройдет сквозь меня, я обернусь и посмотрю на тропу страха. Там, где прошел страх, не останется ничего. Там, где прошел страх, останусь только я."
                textAtRight={true}
                index={3}
                picturesArray={sculptures}
            ></InfoBlock>

            <InfoBlock
                text="Скажите мне, что вы презираете, и я скажу вам, кто вы."
                index={0}
                picturesArray={sculptures}
            ></InfoBlock>

            <InfoBlock
                text="Глубоко в подсознании людей укоренилась поистине извращенная потребность в разумно устроенной, логичной и упорядоченной Вселенной. Но дело в том, что реальная Вселенная всегда, пусть на один шаг, опережает логику. "
                textAtRight={true}
                index={2}
                picturesArray={sculptures}
            ></InfoBlock>
        </div>
    )
}
