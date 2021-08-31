import React from 'react'

export default function ImagePopup({onClose, card, isOpen}) { 
    return (
        <div className={isOpen ? 'popup popup_active': 'popup'} id="open-image">
        <div className="popup__image-container popup__container_image">
            <button className="popup__close-button" id="closeImage" type="button" aria-label="Закрыть открытие карточки" onClick={onClose}></button>
            <img className="popup__picture" src={card.link} alt={card.name} />
            <figcaption className="popup__figcaption">{card.name}</figcaption>
        </div>
    </div>
    )
}