import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';


export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [cardTitle, setCardTitle] = useState('');
    const [cardLink, setCardLink] = useState('');

  //Обработчик установки названия места
  function handleCardTitle(event) {
    setCardTitle(event.target.value)
  }

  //Обработчик установки картинки (ссылки на картинку)
  function handleCardLink(event) {
    setCardLink(event.target.value)
  }

    function handleSubmit(event) {
        event.preventDefault();
    
        onAddPlace({
          name: cardTitle,
          link: cardLink
        })
      }

      useEffect(() => {
        setCardLink('')
        setCardTitle('')
      }, [isOpen])

    return (
        <PopupWithForm  title="Новое место" submitButtonText="Создать" name="newCard" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                    <input className="popup__input popup__input_type_title" 
                    id="input-title" 
                    type="text" 
                    placeholder="Название" 
                    name="name" 
                    minLength="2" 
                    maxLength="30" 
                    required 
                    onChange={handleCardTitle}
                    value={cardTitle ? cardTitle : ''} />
                    <span className="popup__input-error input-title-error"></span>
                    <input className="popup__input popup__input_type_link" 
                    id="input-link" 
                    type="url" 
                    placeholder="Ссылка на картинку" 
                    name="link" 
                    required 
                    onChange={handleCardLink}
                    value={cardLink ? cardLink : ''}/>
                    <span className="popup__input-error input-link-error"></span>
        </PopupWithForm>
    )
}