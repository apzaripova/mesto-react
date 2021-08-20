import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import PopupWithForm from'./PopupWithForm'
import api from '../utils/api'
import ImagePopup from './ImagePopup'

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState({
        isOpen: false,
        link: '',
        name: ''
      });

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
          .then(([info, initialCards]) => {
            setUserName(info)
            setUserDescription(info)
            setUserAvatar(info)
            setCards(initialCards)
          })
          .catch((err) => {
            console.log(err);
          })
        }, []);


    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    function handleCardClick(link, name) {
        setSelectedCard({
          isOpen: true,
          link: link,
          name: name
        });
      }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({
            isOpen: false,
            link: '',
            name: ''
          })
    };

  return (
    <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} userName={userName} userAvatar={userAvatar} userDescription={userDescription}/>
        <Footer />
        <PopupWithForm  title="Редактировать профиль" submitButtonText="Сохранить"  name="profileEdit" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                        <input className="popup__input popup__input_type_name" id="input-name" type="text" placeholder="Имя" name="firstname" minLength="2" maxLength="40" required />  
                        <span classname="popup__input-error input-name-error"></span>
                        <input className="popup__input popup__input_type_job " id="input-job" type="text" placeholder="О себе" name="job" minLength="2" maxLength="200" required />
                        <span className="popup__input-error input-job-error"></span>
        </PopupWithForm>
        <PopupWithForm  title="Новое место" submitButtonText="Создать" name="newCard" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                    <input className="popup__input popup__input_type_title" id="input-title" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
                    <span className="popup__input-error input-title-error"></span>
                    <input className="popup__input popup__input_type_link" id="input-link" type="url" placeholder="Ссылка на картинку" name="link" required />
                    <span className="popup__input-error input-link-error"></span>
        </PopupWithForm>
        <PopupWithForm  title="Вы уверены?" name="confirmPopup" submitButtonText="Да" isOpen={false} onClose={closeAllPopups} />
        <PopupWithForm  title="Обновить аватар" submitButtonText="Сохранить" name="avatarUpdate" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                    <input className="popup__input" type="url" id="input-avatar" placeholder="Ссылка на картинку" name="avatar" required />
                    <span className="popup__input-error input-avatar-error"></span>
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
    </div>
  );
}

export default App;
