import React from 'react'

export default function ImagePopup(props) { 
    return (
        <div className={props.card.isOpen ? 'popup popup_active': 'popup'} id="open-image">
        <div className="popup__image-container popup__container_image">
            <button className="popup__close-button" id="closeImage" type="button" aria-label="Закрыть открытие карточки" onClick={props.onClose}></button>
            <img className="popup__picture" src={ props.card.link } alt={ props.card.name } />
            <figcaption className="popup__figcaption">{props.card.name}</figcaption>
        </div>
    </div>
    )
}