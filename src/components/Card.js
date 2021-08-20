import React from 'react'

export default function Card(props) {
     
    function handleClick() {
        props.onCardClick(props.card.link, props.card.name);
      }

    return (
        <li className="card">
                            <img className="card__photo" alt={props.card.name} src={props.card.link} onClick={handleClick}
                                style={{ backgroundImage: `url(${ props.card.link })` }}/>
                            <button className="card__button-delete"></button>
                        <div className="card__info">
                            <h2 className="card__title">{props.card.name}</h2>
                            <div className="card__container-like">
                                <button className="card__button-like" type="button" aria-label="Лайк"></button>
                                <span className="card__count-like">0</span>
                            </div>
                        </div>
        </li>
    )
}