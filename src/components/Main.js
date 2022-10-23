import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
export default function Main(props) {
  function allnewDice() {
    // //ES6 fast way
    // return Array(10)
    //   .fill()
    //   .map(() => Math.floor(Math.random() * 6) + 1);

    //normal JS
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  const [diceArr, setDiceArr] = React.useState(allnewDice());
  const diceElement = diceArr.map((dice) => (
    <Dice value={dice.value} key={dice.id} isHeld={dice.isHeld} />
  ));
  function rollDice() {
    setDiceArr(allnewDice());
  }
  return (
    <main className={props.darkMode ? "dark" : ""}>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElement}</div>
      <button className="roll-btn" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
