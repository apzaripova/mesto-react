import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(e) {
      setName(e.target.value);
    }
  
    function handleDescriptionChange(e) {
      setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        });
      }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, isOpen]);

    return (
        <PopupWithForm  title="Редактировать профиль" submitButtonText="Сохранить"  name="profileEdit" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
              <input className="popup__input popup__input_type_name" 
                        id="input-name" 
                        type="text" 
                        placeholder="Имя" 
                        name="firstname" 
                        minLength="2" 
                        maxLength="40" 
                        required 
                        value={name || ''} 
                        onChange={handleNameChange}/>  
              <span className="popup__input-error input-name-error"></span>
              <input className="popup__input popup__input_type_job " 
                        id="input-job" 
                        type="text" 
                        placeholder="О себе" 
                        name="job" 
                        minLength="2" 
                        maxLength="200" 
                        required 
                        value={description || ''} 
                        onChange={handleDescriptionChange}/>
              <span className="popup__input-error input-job-error"></span>
        </PopupWithForm>
    )
}