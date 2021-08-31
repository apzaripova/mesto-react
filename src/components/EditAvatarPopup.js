import React from 'react';
import PopupWithForm from './PopupWithForm';


export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const inputValue = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputValue.current.value
        });
    }

    return (
        <PopupWithForm  title="Обновить аватар" submitButtonText="Сохранить" name="avatarUpdate" onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose}>
                    <input ref={inputValue} className="popup__input" type="url" id="input-avatar" placeholder="Ссылка на картинку" name="avatar" required />
                    <span className="popup__input-error input-avatar-error"></span>
        </PopupWithForm>
    )
}