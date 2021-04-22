import React from "react";
import ReactDOM from "react-dom";
import costumizingGames from "../../pages/costumizingGames";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<costumizingGames />, div);
  ReactDOM.unmountComponentAtNode(div);
});
