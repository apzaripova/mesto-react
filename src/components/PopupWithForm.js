import React from 'react'

export default function PopupWithForm(props) {
    return (
        <div className={props.isOpen ? 'popup popup_active' : 'popup'} id={props.name}>
            <form className="popup__container">
                <h2 className="popup__profile">{props.title}</h2>
                {props.children}
                <button type="submit" className="popup__button">{props.submitButtonText}</button>
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            </form>
        </div>
    )
}