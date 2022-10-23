import React from "react";
export default function Dice(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "#fffff",
  };
  return (
    <div className={"dice"} style={style}>
      <h2>{props.value}</h2>
    </div>
  );
}
