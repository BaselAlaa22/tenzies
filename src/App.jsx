import { useState, useRef, useEffect } from "react";
import Die from "./Die.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const newGameBtn = useRef(null);

  const gameWon = dice.every((die) => {
    return die.value === dice[0].value && die.isHeld;
  });

  useEffect(() => {
    if (gameWon) {
      newGameBtn.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    const arr = [];

    for (let i = 0; i < 10; i++) {
      arr[i] = {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      };
    }
    return arr;
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice);
    } else {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld
            ? die
            : { ...die, value: Math.floor(Math.random() * 6) + 1 }
        )
      );
    }
  }

  const diceElements = dice.map(({ value, isHeld, id }) => (
    <Die key={id} id={id} value={value} isHeld={isHeld} hold={hold} />
  ));

  return (
    <main>
      {gameWon && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button ref={newGameBtn} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
