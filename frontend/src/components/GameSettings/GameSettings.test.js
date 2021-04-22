import React from "react";
import GameSettings from "../../pages/GameSettings";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<GameSettings />);
});
