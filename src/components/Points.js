import React from "react";
import coin from "../assets/coin.jpeg";

export default function Points({ dimension, points, color }) {
  return (
    <div
      className="point-bar"
      style={{ width: dimension, border: "1px solid black" }}
    >
      <div style={{ color: color, padding: "10px" }}>Points: {points}</div>
      <div>
        <img src={coin} alt="coin" style={{ width: "60px", height: "72px" }} />
      </div>
    </div>
  );
}
