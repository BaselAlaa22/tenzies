import { useState } from "react";
import Die from "./Die.jsx";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    const arr = [];

    for (let i = 0; i < 10; i++) {
      arr[i] = {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: true,
        id: nanoid(),
      };
    }
    return arr;
  }

  function rollDice() {
    setDice(generateAllNewDice());
  }

  const diceElements = dice.map(({ value, isHeld, id }) => (
    <Die key={id} value={value} isHeld={isHeld} />
  ));

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>Roll</button>
    </main>
  );
}
