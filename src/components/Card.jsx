import React from 'react';

function Card({ item, handleSelectedCards, toggled, stopFlip }) {
    return (
        <div
            className={`card image is-square${toggled ? ' is-flipped' : ''}`}
            onClick={() => !stopFlip && handleSelectedCards(item)}
        >
            <div className="card-content">
                {toggled ? (
                    <figure className="image is-square">
                        <img src={item.image} alt={item.name} />
                    </figure>
                ) : (
                    <div className=" has-text-centered">
                        <p className="is-size-1 p-6 m-6">?</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
