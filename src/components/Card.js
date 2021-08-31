import React from 'react'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardDelete, onCardLike, }) {

    const currentUser = React.useContext(CurrentUserContext);

     //Определяем, являемся ли мы владельцем карточки
    const isOwn = card.owner._id === currentUser._id;

    //Переменная для класса кнопки удаления (если карточка наша -- видим иконку удаления)
    const cardDeleteButtonClassName = (
        `card__button-delete ${isOwn ? 'card__delete-button_visible' : 'card__button-delete_hidden'}`
      );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `card__button-like ${isLiked ? 'card__button-like_active' : ''}`
      );
     
    function handleClick() {
        onCardClick(card);
      }

    function handleCardLike() {
        onCardLike(card)
      }

      function handleDeleteCard() {
        onCardDelete(card)
      }

    return (
        <li className="card">
            <div className="card__container">
                            <img className="card__photo" alt={card.name} src={card.link} onClick={handleClick} />
                            <button className={cardDeleteButtonClassName} onClick={handleDeleteCard}></button>
            </div>
                        <div className="card__info">
                            <h2 className="card__title">{card.name}</h2>
                            <div className="card__container-like">
                                <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleCardLike}></button>
                                <span className="card__count-like">{card.likes.length}</span>
                            </div>
                        </div>
        </li>
    )
}