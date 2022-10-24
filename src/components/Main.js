import React, { useState } from "react";
import Dice from "./Dice";
import Confetti from "react-confetti";
import { nanoid } from "nanoid"; // dependency to generate unique id
export default function Main(props) {
  const [diceArr, setDiceArr] = React.useState(allnewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [startGame, setStartGame] = React.useState(false);

  //check if player win
  React.useEffect(() => {
    const allHeld = diceArr.every((dice) => dice.isHeld);
    const allSame = diceArr.every((dice) => dice.value === diceArr[0].value);
    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, [diceArr]);
  //func to start game
  function begin() {
    setStartGame(true);
  }
  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allnewDice() {
    //normal JS func to generate an array of 10 random numbers
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
    // //ES6 fast way to generate an array of 10 random numbers
    // return Array(10)
    //   .fill()
    //   .map(() => Math.floor(Math.random() * 6) + 1);
  }

  //func to get new array when click Roll button
  function rollDice() {
    if (!tenzies) {
      setDiceArr((oldDie) =>
        oldDie.map((dice) => {
          return dice.isHeld ? dice : generateNewDice();
        })
      );
      setCount((oldRoll) => oldRoll + 1);
    } else {
      // reset game
      setTenzies(false);
      setDiceArr(allnewDice());
      setCount(0);
    }
  }
  //func to get dice's id when click each dice
  function holdDice(id) {
    setDiceArr((oldDie) =>
      oldDie.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  //Map array to die components
  const diceElement = diceArr.map((dice) => (
    <Dice
      value={dice.value}
      key={dice.id}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));
  //display inital message
  const render = () => {
    if (!tenzies) {
      if (!startGame) {
        return (
          <div className="die-container-start">
            <button className="roll-btn-start" onClick={begin}>
              Start game
            </button>
          </div>
        );
      } else {
        return <div className="die-container">{diceElement}</div>;
      }
    }
  };
  return (
    <main className={props.darkMode ? "dark" : ""}>
      {tenzies && <Confetti />}

      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      {render()}
      {!startGame && !tenzies ? (
        ""
      ) : (
        <button
          className="roll-btn"
          onClick={() => {
            rollDice();
            //   countRoll();
          }}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      )}

      <div className="bottom-group">
        <p className="countRoll">
          Time <span className="countTime">0:00</span>
        </p>
        <p className="countRoll">
          Best rolls: <b>{count}</b>
        </p>
      </div>
    </main>
  );
}
