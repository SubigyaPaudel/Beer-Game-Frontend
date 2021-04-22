import React from "react";
import LearnMore from "./index";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<LearnMore />);
});
