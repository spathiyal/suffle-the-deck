import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const baseUrl = "https://deckofcardsapi.com/api/deck";

function Deck() {
  // set deck
  const [deck, setDeck] = useState(null);
  // set drawn
  const [drawn, setDrawn] = useState([]);
  // shuffle
  const [isShuffling, setIsShuffling] = useState(false);
  //fetch card with API call
  useEffect(function loadCards() {
    async function fetchCard() {
      const deck = await axios(`${baseUrl}/new/shuffle/`);
      setDeck(deck.data);
    }
    fetchCard();
  }, []);
  //draw card
  async function draw() {
    try {
      const res = await axios(`${baseUrl}/${deck.deck_id}/draw/`);
      if (res.data.remaining === 0) {
        throw new Error("Deck is empty");
      }

      const card = res.data.cards[0];
      setDrawn((d) => [
        ...d,
        {
          id: card.code,
          name: card.suit + " " + card.value,
          image: card.image,
        },
      ]);
    } catch (err) {
      alert(err);
    }
  }

  /** Shuffle  */
  async function startShuffling() {
    setIsShuffling(true);
    try {
      await axios.get(`${baseUrl}/${deck.deck_id}/shuffle/`);
      setDrawn([]);
    } catch (err) {
      alert(err);
    } finally {
      setIsShuffling(false);
    }
  }

  /** Return draw button (disabled if shuffling) */
  function renderDrawBtnIfOk() {
    if (!deck) return null;

    return (
      <button className="Deck-gimme" onClick={draw} disabled={isShuffling}>
        DRAW
      </button>
    );
  }

  /** Return shuffle button (disabled if already is) */
  function renderShuffleBtnIfOk() {
    if (!deck) return null;
    return (
      <button
        className="Deck-gimme"
        onClick={startShuffling}
        disabled={isShuffling}
      >
        SHUFFLE DECK
      </button>
    );
  }

  return (
    <main className="Deck">
      {renderDrawBtnIfOk()}
      {renderShuffleBtnIfOk()}

      <div className="Deck-cardarea">
        {drawn.map((card) => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </main>
  );
}

export default Deck;
