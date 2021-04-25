import React from 'react';

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_image-view ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_create_view">
        <button className="popup__close-button"
                type="button"
                onClick={props.onClose}>
        </button>
        <figure className="popup__figure-content">
          <img className="popup__figure-img"
                src={props.card ? props.card.link : "#"}
                alt={props.card ? props.card.name : "#"} />
          <figcaption className="popup__figure-caption">
            {props.card ? props.card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

