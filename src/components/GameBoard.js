// GameBoard.js
import React, { useState, useEffect } from "react";
import Data from "./Data";
import Card from "./Card";

function GameBoard() {
    const [cardsArray, setCardsArray] = useState([]);
    const [moves, setMoves] = useState(0);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [stopFlip, setStopFlip] = useState(false);
    const [won, setWon] = useState(0);

    useEffect(() => {
        NewGame();
    }, []);

    function NewGame() {
        setTimeout(() => {
            const randomOrderArray = Data.sort(() => 0.5 - Math.random());
            setCardsArray(randomOrderArray);
            setMoves(0);
            setFirstCard(null);
            setSecondCard(null);
            setWon(0);
        }, 1200);
    }

    function handleSelectedCards(item) {
        if (firstCard !== null && firstCard.id !== item.id) {
            setSecondCard(item);
        } else {
            setFirstCard(item);
        }
    }

    useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArray((prevArray) => {
                    return prevArray.map((unit) => {
                        if (unit.name === firstCard.name) {
                            return { ...unit, matched: true };
                        } else {
                            return unit;
                        }
                    });
                });
                setWon((preVal) => preVal + 1);
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
        setMoves((prevValue) => prevValue + 1);
    }

    return (
        <div className="container">
            <div className="header">
                <h1>Gra w pamięć</h1>
            </div>
            <button className="button" onClick={NewGame}>Nowa gra</button>
            <div className="comments">
                {won !== 6 ? (
                    <span>Moves : {moves}</span>
                ) : (
                    <span>You Won in {moves} moves</span>
                )}
            </div>
            <div className="board">
                {cardsArray.map((item) => (
                    <Card
                        key={item.id}
                        item={item}
                        handleSelectedCards={handleSelectedCards}
                        toggled={
                            item === firstCard ||
                            item === secondCard ||
                            item.matched === true
                        }
                        stopflip={stopFlip}
                    />
                ))}
            </div>

        </div>
    );
}

export default GameBoard;
