// import React from "react";
// import { shallow } from "enzyme";
// import Configuration from "./index";

// it("should give the instruction guide right", () => {
//   const wrapper = shallow(<Configuration />);
//   const span = wrapper.find("ConfigurationH1");
//   const result = span.text();

//   expect(result).toBe(" Example Settings ");
// });
import React from "react";
import Configuration from "./index";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Configuration />);
});
