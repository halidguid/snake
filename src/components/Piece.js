import React from "react";

export default function Piece({ piece, chunk, colorSnake, colorFood, i }) {
  return (
    <div>
      <div
        key={"piece" + i}
        style={
          piece === "bang"
            ? {
                width: chunk,
                height: chunk,
                backgroundColor: colorSnake,
              }
            : piece === "fruit"
            ? {
                width: chunk,
                height: chunk,
                backgroundColor: colorFood,
              }
            : { width: chunk, height: chunk }
        }
      ></div>
    </div>
  );
}
