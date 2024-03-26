import React from "react";
import { motion } from "framer-motion";
import booknow from "../assets/squash/booknow.jpg";
import tutorials from "../assets/squash/tutorials.png";
import workshops from "../assets/squash/workshops.jpg";
import logo from "../assets/squash/logo.jpg";
import move from "lodash-move";
import BookingApp from "./screens/booking/booking";
import Workshop from "../components/workshops/workshop";
import Tutorial from "../components/tutorials/tutorial";
import Leaderboard from "./screens/leaderboard/leaderboard";
import "./CardStack.css";
import "./screens/home/home.css";

/* THIS CODE CONTAINS THE SWAPPABLE CARDS AND THE nav-squashIGATION BAR, ALONG WITH ALL COMPONENTS CONNECTED */
/* Enter the list of components in the CARD_INDICES array and the corresponding button labels in the BUTTON_LABELS array */
/* Do not alter the internal working of the code */
/* The linked pages in the function also need to be changed, that is, the pages that are to be displayed on the cards. Please do so only at the indicated spot.*/
/* The rest of the code is not to be altered */

const CARD_INDICES = ["1", "2", "3", "4", "5"];
const BUTTON_LABELS = [
  "home",
  "booknow",
  "workshops",
  "tutorials",
  "leaderboard",
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
      <div className="nav-squash">
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
                {/* //CHANGE THE PAGES HERE */}
                {color == "1" ? (
                  <div className="home">
                    <div className="booknow">
                      <img
                        src={booknow}
                        alt="booknow"
                        onClick={() => bringToFront(setIndex(2))}
                      />
                      {/* click image functionality */}
                    </div>
                    <div className="tutorials">
                      <img
                        src={tutorials}
                        alt="tutorials"
                        onClick={() => bringToFront(setIndex(4))}
                      />
                      {/* click image functionality */}
                    </div>
                    <div className="workshops">
                      <img
                        src={workshops}
                        alt="workshops"
                        onClick={() => bringToFront(setIndex(3))}
                      />
                      {/* click image functionality */}
                    </div>
                    <div className="logo">
                      <img src={logo} alt="logo" />
                      {/* click image functionality */}
                    </div>
                    <div class="booknow-line1">avail all facilities!</div>
                    <div class="booknow-line2">book now!</div>
                    <div class="workshops-line1">coaches teach!</div>
                    <div class="workshops-line2">workshops</div>
                    <div class="tutorials-line1">tutorials</div>
                    <div class="tutorials-line2">you can learn too!</div>
                  </div>
                ) : null}
                {color == "2" ? <BookingApp /> : null}
                {color == "3" ? <Workshop sport="squash" /> : null}
                {color == "4" ? <Tutorial sport="squash" /> : null}
                {color == "5" ? <Leaderboard /> : null}
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
