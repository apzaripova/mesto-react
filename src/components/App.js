import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import PopupWithForm from'./PopupWithForm'
import api from '../utils/api'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState({
        link: '',
        name: ''
      });

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
          .then(([info, initialCards]) => {
            setCurrentUser(info)
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

    function handleCardClick(card) {
      setSelectedCard(card);
      setIsImagePopupOpen(!isImagePopupOpen);
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({
            link: '',
            name: ''
          })
    };

    function handleLikeCard(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.setLike(card._id, !isLiked).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка лайка: ${err}`);
      })
  }

  
  function handleDeleteClick(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  const handleUpdateUser = (item) => {
    api.setUserInfo(item)
    .then((newProfile) => {
      setCurrentUser(newProfile);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка обновления профиля: ${err}`);
    })
  }

  const handleUpdateAvatar = (item) => {
    api.setUserAvatar(item)
    .then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка создания карточки: ${err}`);
    })
  }

  const handleAddPlace = (item) => {
    api.postCard(item)
    .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка создания карточки: ${err}`);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick} 
              cards={cards}
              onCardLike={handleLikeCard}
              onCardDelete={handleDeleteClick}/>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
        <PopupWithForm  title="Вы уверены?" name="confirmPopup" submitButtonText="Да" isOpen={false} onClose={closeAllPopups} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
