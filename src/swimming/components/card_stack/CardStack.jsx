import React from "react";
import { motion } from "framer-motion";

import booknow from "../assets/booknow.png"
import tutorials from "../assets/tutorials.png";
import workshops from "../assets/workshops.png";
import logo from "../assets/logo.png";
import move from "lodash-move";
import "./CardStack.css";
import "../Home/home.css"; 
import Home from "../Home/Home";
import Subscribe from "../Subscribe/Subscribe";
import Viewshow from "../Viewshow/Viewshow";
import Tutorial from "../Tutorials/Tutorials";

/* THIS CODE CONTAINS THE SWAPPABLE CARDS AND THE NAVIGATION BAR, ALONG WITH ALL COMPONENTS CONNECTED */
/* Enter the list of components in the CARD_INDICES array and the corresponding button labels in the BUTTON_LABELS array */
/* Do not alter the internal working of the code */
/* The linked pages in the function also need to be changed, that is, the pages that are to be displayed on the cards. Please do so only at the indicated spot.*/
/* The rest of the code is not to be altered */

const CARD_INDICES = ["1", "2", "3", "4"];
const BUTTON_LABELS = [
  "home",
  "subscribe",
  "tutorials",
  "view/show pass"
];

/*INTERNAL WORKING*/
const CARD_OFFSET = 6;
const SCALE_FACTOR = 0.06;
let variable = "1";
const CardStack = () => {
  var globalindex = 1;
  const [cards, setCards] = React.useState(CARD_INDICES);
  const bringToFront = (from) => {
    setCards(move(cards, from, 0));
  };
  const setIndex = (index) => {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i] == index) {
        variable = cards[i];
        return i;
      }
    }
  };
  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= CARD_INDICES.length; i++) {
      buttons.push(
        <li key={i}>
          <button
            style={variable == i.toString() ? activeTabStyle : null}
            onClick={() => {
              bringToFront(setIndex(i));
            }}
          >
            {getButtonLabel(i)}
          </button>
        </li>
      );
    }
    return buttons;
  };

  const getButtonLabel = (index) => {
    return BUTTON_LABELS[index - 1];
  };

  return (
    <div>
      <div className="nav">
        <ul>{renderButtons()}</ul>
      </div>
      <div className="wrapperStyle">
        <ul style={cardWrapStyle}>
          {cards.map((color, index) => {
            return (
              <motion.li
                key={color}
                style={{
                  ...cardStyle,
                }}
                animate={{
                  top: index * -CARD_OFFSET,
                  scale: 1 - index * SCALE_FACTOR,
                  zIndex: CARD_INDICES.length - index,
                }}
                onClick={() => {}}
              >
                
                {color == "1" ? <Home/> : null}
                {color == "2" ? <Subscribe /> : null}
                {color == "3" ? <Tutorial /> : null}
                {color == "4" ? <Viewshow /> : null}
                {/* //CHANGE THE PAGES HERE */}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const cardWrapStyle = {
  position: "relative",
  width: "80vw",
  height: "220px",
};

const cardStyle = {
  position: "absolute",
  width: "80vw",
  height: "600px",
  borderRadius: "25px",
  transformOrigin: "top center",
  listStyle: "none",
  background: "#e0d9d9",
  border: "1.5px solid #ff0000",
};

const activeTabStyle = {
  background: "#EF3E3E",
  color: "white",
};

export default CardStack;
