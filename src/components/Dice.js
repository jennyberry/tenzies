import React from "react";

export default function Dice(props) {
  const selected = props.isHeld ? "dice-selected" : "";

  let diceFace;
  switch (props.value) {
    case 1:
      diceFace = "one";
      break;
    case 2:
      diceFace = "two";
      break;
    case 3:
      diceFace = "three";
      break;
    case 4:
      diceFace = "four";
      break;
    case 5:
      diceFace = "five";
      break;
    case 6:
      diceFace = "six";
      break;
  }
  return (
    //fontawesome element
    <i
      className={`fa-solid fa-dice-${diceFace} dice ${selected} fa-4x`}
      onClick={props.holdDice}
    ></i>
  );
}
