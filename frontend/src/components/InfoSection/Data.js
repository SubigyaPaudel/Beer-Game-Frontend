/**
 * Objects with datas for individual info section
 */
export const homeObjOne = {
  id: "what",
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: "Supply Chain",
  headline: "Learn through our beer distribution game",
  description:
    "Control a supply chain stage and experience typical coordination problems due to lack of information sharing. Learn how a supply chain partner can highly influence the entire supply supply chain by ordering too much or too little which can lead to a bullwhip effect.",
  buttonLabel: "Learn More",
  imgStart: false,
  img: require("../../images/svg-1.svg").default,
  alt: "",
  dark: true,
  primary: true,
  darkText: false,
  direct: "/learnmore",
};

export const homeObjTwo = {
  id: "how",
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "Join a game",
  headline: "Enter the Log In details",
  description:
    "A game has role of Retailer, Wholesaler, Distributor, and Factory to choose from. The host has access to all the Log In details of each supply chain partner for a game session. You can enter this into the sign in page and thats all to get you going. Happy ordering!",
  buttonLabel: "Sign In",
  imgStart: true,
  img: require("../../images/svg-2.svg").default,
  alt: "",
  dark: false,
  primary: true,
  darkText: true,
  direct: "/signin",
};

export const homeObjThree = {
  id: "custom",
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: "Set your own rules",
  headline: "Various game configurations on a simple menu",
  description:
    "As a host, you have control over the configuration of games. From setting custom demand pattern to removing a supply chain partner, these settings let you decide how the game should be like. Furthermore, live analytics will be provided to help you keep track of game progress.",
  buttonLabel: "See what you can customize",
  imgStart: false,
  img: require("../../images/svg-3.svg").default,
  alt: "",
  dark: true,
  primary: true,
  darkText: false,
  direct: "/costumizingGames",
};
