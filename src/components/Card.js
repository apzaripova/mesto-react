import React from 'react'

export default function Card({card, onCardClick}) {
     
    function handleClick() {
        onCardClick(card);
      }

    return (
        <li className="card">
            <div className="card__container">
                            <img className="card__photo" alt={card.name} src={card.link} onClick={handleClick}
                                style={{ backgroundImage: `url(${card.link })` }}/>
                            <button className="card__button-delete"></button>
            </div>
                        <div className="card__info">
                            <h2 className="card__title">{card.name}</h2>
                            <div className="card__container-like">
                                <button className="card__button-like" type="button" aria-label="Лайк"></button>
                                <span className="card__count-like">{card.likes.length}</span>
                            </div>
                        </div>
        </li>
    )
}