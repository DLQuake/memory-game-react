import React, { useState, useEffect } from 'react';
import Card from './Card';
import Data from './Data';

function GameBoard() {
    const [cardsArray, setCardsArray] = useState([]);
    const [moves, setMoves] = useState(0);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [stopFlip, setStopFlip] = useState(false);
    const [won, setWon] = useState(0);
    const [score, setScore] = useState(0);  // Dodanie stanu punktów

    useEffect(() => {
        NewGame();
    }, []);

    function NewGame() {
        const shuffledArray = [...Data].sort(() => 0.5 - Math.random());
        setCardsArray(shuffledArray);
        setMoves(0);
        setFirstCard(null);
        setSecondCard(null);
        setWon(0);
        setScore(0);  // Resetowanie punktów przy nowej grze
    }

    function handleSelectedCards(item) {
        if (!stopFlip) {
            if (firstCard && firstCard.id !== item.id) {
                setSecondCard(item);
            } else {
                setFirstCard(item);
            }
        }
    }

    useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArray((prevArray) =>
                    prevArray.map((card) => (card.name === firstCard.name ? { ...card, matched: true } : card))
                );
                setWon((prevWon) => prevWon + 1);
                setScore((prevScore) => prevScore + 10); // Zwiększanie punktów za poprawną parę
                removeSelection();
            } else {
                setTimeout(() => {
                    removeSelection();
                }, 1000);
            }
        }
    }, [firstCard, secondCard]);

    function removeSelection() {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves((prevMoves) => prevMoves + 1);
    }

    return (
        <div>
            <div className="level">
                <div className="level-left">
                    <button className="button is-medium is-primary" onClick={NewGame}>New Game</button>
                </div>
                <div className="level-right">
                    <p className="is-size-3 has-text-weight-bold">{won !== 8 ? `Moves: ${moves}` : `You Won in ${moves} moves!`}</p>
                    <p className="is-size-3 has-text-weight-bold">{`Score: ${score}`}</p>
                </div>
            </div>

            <div className="columns is-multiline">
                {cardsArray.map((item) => (
                    <div className="column is-one-quarter" key={item.id}>
                        <Card
                            item={item}
                            handleSelectedCards={handleSelectedCards}
                            toggled={item === firstCard || item === secondCard || item.matched}
                            stopFlip={stopFlip}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
