import React from "react";
import HeroSection from "./index";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<HeroSection />);
});
