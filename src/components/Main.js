import React from 'react'
import Card from './Card'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike,
    onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
        <section className="profile">
                <div className="profile__avatar-container"> 
                    <img className="profile__avatar" 
                        src={currentUser.avatar}
                        alt='Аватар пользователя'
                    />
                    <button className="profile__avatar-button profile__avatar" aria-label="форма обновления аватара" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__intro">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__button-edit" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
            <button className="profile__add-button" type="button" aria-label="Добавить карточку" onClick={onAddPlace}></button>
        </section>
        <section className="cards">
        <ul className="cards__list">
            {cards.map(card => (
                <Card 
                key={card._id}
                card={card}
                onCardClick={ onCardClick }
                onCardLike={ onCardLike }
                onCardDelete={ onCardDelete } 
            />
            )
            )}
        </ul>
        </section>
    </main>
    )
}