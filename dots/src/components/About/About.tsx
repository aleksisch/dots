import React, {useState} from 'react';
import styles from "../Board/Board.module.css";

const About = () => {
    return (
        <div style={{alignItems: 'center', justifyContent: 'center'}}>
            <a href="https://ru.wikipedia.org/wiki/%D0%A2%D0%BE%D1%87%D0%BA%D0%B8_(%D0%B8%D0%B3%D1%80%D0%B0)">То́чки</a> — логическая настольная игра для двух
            человек, сочетающая позиционное стратегическое планирование с тактическим перебором вариантов. Ведётся на плоском игровом поле, расчерченном на клетки одинакового размера. Игроки поочерёдно ставят точки двух цветов в перекрестия линий. Цель — окружить точки соперника замыканием вокруг них непрерывной цепи своих точек.
        </div>
    )
}
export default About;
