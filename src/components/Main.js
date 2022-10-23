import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid"; // dependency to generate unique id
export default function Main(props) {
  function allnewDice() {
    // //ES6 fast way to generate an array of 10 random numbers
    // return Array(10)
    //   .fill()
    //   .map(() => Math.floor(Math.random() * 6) + 1);

    //normal JS func to generate an array of 10 random numbers
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

  //func to get new array when click Roll button
  function rollDice() {
    setDiceArr(allnewDice());
  }
  //func to get dice's id when click each dice
  function holdDice(id) {
    console.log(id);
  }
  const [diceArr, setDiceArr] = React.useState(allnewDice());
  //Map array to die components
  const diceElement = diceArr.map((dice) => (
    <Dice
      value={dice.value}
      key={dice.id}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));
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
