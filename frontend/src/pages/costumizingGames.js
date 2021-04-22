import React from "react";
import Navbar from "../components/Navbar";
import pic from "../images/svg-3.svg";
import { Route, Switch } from "react-router-dom";

const costumizingGames = () => {
  return (
    <div class="container-md">
      <div>
        <Navbar />
        <img src={pic} alt="" width="1000px" height="200px" />
        <ul>
          <p>
            <br></br>
            The instructor can set the initial values for the following
            parameters prior to the start of each game.
          </p>
          <br></br>
          <li>Number of rounds, weeks per game</li>
          <br></br>
          <li>Time delay for both upstream and downstream</li>
          <br></br>
          <li>Initial number of items in inventory of each stakeholder</li>
          <br></br>
          <li>The backlog and the cost of each item in stock</li>
          <br></br>
          <li>
            The amount of information available to each stakeholder can view in
            the game
          </li>
          <br></br>
        </ul>
      </div>
    </div>
  );
};

export default costumizingGames;
