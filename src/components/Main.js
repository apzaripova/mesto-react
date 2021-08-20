import React from 'react'
import Card from './Card'

export default function Main(props) {

    return (
        <main className="content">
        <section className="profile">
                <div className="profile__avatar-container" style={{ backgroundImage: `url(${props.userAvatar.avatar})` }}> 
                    <img className="profile__avatar" 
                        src=""
                        alt="Аватарка" 
                    />
                    <button className="profile__avatar-button profile__avatar" aria-label="форма обновления аватара" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__intro">
                        <h1 className="profile__name">{props.userName.name}</h1>
                        <button className="profile__button-edit" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{props.userDescription.about}</p>
                </div>
            <button className="profile__add-button" type="button" aria-label="Добавить карточку" onClick={props.onAddPlace}></button>
        </section>
        <section className="cards">
        <ul className="cards__list">
            {props.cards.map(card =>
                <Card 
                    key={card._id}
                    card={card}
                    onCardClick={ props.onCardClick }
                />
            )}
        </ul>
        </section>
    </main>
    )
}