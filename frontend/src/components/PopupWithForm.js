import React from 'react';

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_create_form">
        <button className="popup__close-button"
                type="button"
                onClick={props.onClose}>
        </button>
        <div className="popup__content">
          <h2 className="popup__title">
            {props.title}
          </h2>
          <form className={`popup__form popup__form_${props.name}`}
                name={props.name}
                noValidate
                onSubmit={props.onSubmit}>
              {props.children}
            <button className="popup__save-button"
                    type="submit"
                    onClick={props.onClose}>
              {props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
