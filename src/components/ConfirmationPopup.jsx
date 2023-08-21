import React, { useEffect } from 'react';

function ConfirmationPopup({ isOpen, onClose, onConfirm, isPreloading }) {
    
    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    function handleContainerClick(e) {
        e.stopPropagation();
    }

    function handleSubmit(e) {
        e.preventDefault();
        onConfirm();
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onConfirm();
            onClose();
        }
        if (event.key === 'Escape' && isOpen) {
            onClose();
        }
    };
    
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div 
            className={`popup popup_content_confirm ${isOpen && 'popup_opened'}`} 
            onClick={handleOverlayClick}
        >
            <div className="popup__container" onClick={handleContainerClick}>
                <button 
                    className="button popup__close-button button_close_question" 
                    type="button" 
                    aria-label="Кнопка Закрыть окно" 
                    onClick={onClose}
                ></button>
                <h2 className="popup__title popup__title_content_confirm">Вы уверены?</h2>
                <button 
                    className="button popup__save-button" 
                    type="submit" 
                    aria-label="Кнопка Да" 
                    onClick={handleSubmit}
                >
                    {isPreloading ? 'Карточка всё...' : 'Да'}
                </button>
            </div>
        </div>
    );
}

export default ConfirmationPopup;