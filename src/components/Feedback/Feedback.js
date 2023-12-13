import React from 'react'
import './Feedback.css'

const Feedback = ({needFeedback, errorMessage}) => {
    const setContent = () => {
        if (needFeedback) {
            return (
                <div className="feedback">
                        <span className="feedback__text">Ничего не найдено</span>
                </div>
            )
        } else if (Object.keys(errorMessage).length) {
            return (
                <div className="feedback">
                        <span className="feedback__text">{errorMessage}</span>
                </div>
            )
        }
    }
    return setContent();
};

export default Feedback;
