import React, { useState } from "react";
import "./Card.css";
// show card on the deck and show the angle

function Card({ name, image }) {
  const [{ angle, x, y }] = useState({
    angle: Math.random() * 180 - 90,
    x: Math.random() * 90 - 30,
    y: Math.random() * 90 - 30,
  });
  const transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

  return <img className="Card" alt={name} src={image} style={{ transform }} />;
}

export default Card;
