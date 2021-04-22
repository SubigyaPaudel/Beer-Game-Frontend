import React, { useEffect, useState } from "react";
import Logo from "../../../../images/beer-box.png";
import { Button } from "../../../../components/ButtonElements";
import { useHistory, useRouteMatch } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import * as bootstrap from "react-bootstrap";
import LineChart from "./line_chart";
import "./index.css";
import {
  Gamecontainer,
  Icon,
  Pagecontainer,
  Pagecontainer1,
  Pagecontainer2,
  Pagetext,
  Tableoutline,
  Tablecontent,
  Pagebtn,
  Marginside,
  Margintop,
  Smalltext,
  Counttext,
  Pagehead,
  Leftmargin,
} from "../Gamepage/GamepageElements";

//screen one
const Gamepage = ({ toggle }) => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  //SECTION: States and hooks initialization

  const { url, path } = useRouteMatch();
  const history = useHistory();

  const [Info, setInfo] = useState(null);
  const [inputerrormsg, setinputerrormsg] = useState(null);
  const [isPlotting, setisPlotting] = useState(null);
  const [playersStatus, setplayersStatus] = useState(null);
  const [nextround, setNextRound] = useState(null);
  const [success, setSuccess] = useState(null);

  const hierarchy = ['retailer', 'wholesaler', 'distributor', 'factory'];

  // SECTION: DUMMY DATA

  //fake data fetched from the API for testing
  let past_data = {
    my_role: "wholesaler",
    game_number: "0101",
    demand_pattern: [8,2,5,4,1,6],
    orders: {
      retailer: [1, 2, 3, 4, 5],
      wholesaler: [4, 5, 6, 7, 9],
      distributor: [10, 11, 12, 13, 14],
      factory: [100, 200, 300, 400, 500],
    },
    shipments: {
      retailer: [0, 0, 0, 1, 2],
      wholesaler: [0, 0, 0, 4, 5],
      distributor: [0, 0, 0, 13, 11],
      factory: [0, 100, 200, 150, 400],
    },
    past_info: [
      {
        week: "1",
        inventory: "10",
        demand: "3",
        incoming_shipment: "0",
        outgoing_shipment: "3",
        order: "4",
        current_cost: "3.5",
      },
      {
        week: "2",
        inventory: "7",
        demand: "6",
        incoming_shipment: "0",
        outgoing_shipment: "6",
        order: "10",
        current_cost: "0.5",
      },
      {
        week: "3",
        inventory: "1",
        demand: "3",
        incoming_shipment: "0",
        outgoing_shipment: "1",
        order: "10",
        current_cost: "2",
      },
      {
        week: "4",
        inventory: "1",
        demand: "3",
        incoming_shipment: "0",
        outgoing_shipment: "1",
        order: "10",
        current_cost: "2",
      },
      {
        week: "5",
        inventory: "-2",
        demand: "4",
        incoming_shipment: "0",
        outgoing_shipment: "1",
        order: "100",
        current_cost: "4",
      },
    ],
  };

  var dummy_status = [
    {
      retailer: "Not Ordered",
      wholesaler: "Not Ordered",
      distributor: "Not Ordered",
      factory: "Not Ordered",
    },
    {
      retailer: "Not Ordered",
      wholesaler: "Ordered",
      distributor: "Not Ordered",
      factory: "Not Ordered",
    },
    {
      retailer: "Not Ordered",
      wholesaler: "Ordered",
      distributor: "Not Ordered",
      factory: "Ordered",
    },
    {
      retailer: "Ordered",
      wholesaler: "Ordered",
      distributor: "Ordered",
      factory: "Ordered",
    },
  ];

  //SECTION: GLOBAL VARIABLES AND FREQUENTLY USED FUNCTIONS

  let current_status = 0;

  let interval_id = null;

  const get_down_stream_demand = (role) => {
    if(role === 'retailer'){
      return Info.demand_pattern[Info.demand_pattern.length - 1]
    }else{
      const orders = Info.orders;
      for(let i = 1; i < hierarchy.length; i++){
        if(hierarchy[i] === role){
          console.log(orders[hierarchy[i-1]][orders.length - 1]);
          return orders[hierarchy[i-1]][orders[hierarchy[i-1]].length - 1]
        }
      }
    }
    return 'Nothing found';
  }

  const downstream_player = (role) => {
    for(let i = 1; i < hierarchy.length; i++){
      if(hierarchy[i] == role){
        console.log('Downstream player = ', hierarchy[i-1]);
        return hierarchy[i-1];
      }
    }
  }

  const poller = () =>
    setInterval(() => {
      let counter = document.getElementById("counter");
      if (counter !== null) {
        let current_count = counter.innerText;
        if (current_count == 0) {
          // just simulating the fetching of data from the server
          // perform fetch or axios calls for the
          // inquiry of other supply chain partners here
          // At this point in time the code will show that the retailer
          // or whatever the role of the current player is, has not submitted
          // their order, even if they have. This will be solved when
          // we get the data from the backend regarding the submission
          // status of players

          if (dummy_status[current_status]) {
            let allsubmitted = true;
            for (var property in dummy_status[current_status]) {
              if (dummy_status[current_status][property] == "Not Ordered") {
                allsubmitted = false;
                break;
              }
            }
            if (allsubmitted === true) {
              setNextRound(true);
            }
            setplayersStatus(dummy_status[current_status]);
            current_status++;
          }
          counter.innerText = 15;
        } else {
          counter.innerText = counter.innerText - 1;
        }
      }
    }, 1000);

  useEffect(() => {
    //just a simulation of the actual delay, remove the setTimeout if the backend
    //has been established
    interval_id = poller();
    const loader = setTimeout(() => {
      setInfo(past_data);
    }, 1000);
    setplayersStatus(dummy_status[current_status]);
    return () => {
      clearInterval(interval_id);
      clearTimeout(loader);
    };
  }, []);

  //another piece of fake data fetched from the API

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = document.getElementById("demand").value;
    if (!Number.isInteger(Number.parseFloat(input))) {
      setinputerrormsg("Order must be an integer");
    } else {
      setinputerrormsg(null);
      setSuccess("Your Submission status has been noted by the server.");
      //make the api call and submit this week's order here
    }
  };

  const handleQuit = (event) => {
    event.preventDefault();
    //make api calls to inform that the user has quit
    clearInterval(interval_id);
    history.push(`/player`);
  };

  const plot = (type) => {
    clearInterval(interval_id);
    let data = [];
    data.push({
      label: "Demand",
      data: Info.past_info.map((data) => parseInt(data.demand)),
      borderColor: "red",
      pointBorderColor: "red",
      pointBackgroundColor: "red",
      borderWidth: 1,
    });
    data.push({
      label: "Inventory",
      data: Info.past_info.map((data) => parseInt(data.inventory)),
      borderColor: "green",
      pointBorderColor: "green",
      pointBackgroundColor: "green",
      borderWidth: 1,
    });
    data.push({
      label: "Order",
      data: Info.past_info.map((data) => parseInt(data.order)),
      borderColor: "blue",
      pointBorderColor: "blue",
      pointBackgroundColor: "blue",
      borderWidth: 1,
    });
    switch(type){
      case 'demand':
        data = data.filter(object => object.label == 'Demand')
        break;
      case 'inventory':
        data = data.filter(object => object.label == 'Inventory')
        break;
      case 'order':
        data = data.filter(object => object.label == 'Order')
        break;
      default:
        data = data
    }
    setisPlotting(data);
  };

  //SECTION: COMPONENT STRUCTURE

  if (Info) {
    return (
      <>
        {!isPlotting && (
          <Gamecontainer>
            <Pagecontainer>
              <Pagecontainer1>
                {" "}
                {/* screen 1*/}
                <Pagetext>
                  <Pagetext>Game number : {`${Info.game_number}`}</Pagetext>

                  <Tableoutline>
                    <Tablecontent>
                      Demand from downstream: {get_down_stream_demand(Info.my_role)}
                      <Leftmargin />
                      Beginning inventory:
                    </Tablecontent>
                    <Marginside />
                    <Tablecontent>
                      On backorder:
                      <Marginside />
                      Incoming Shipment:
                    </Tablecontent>
                    <Smalltext>
                      Total requirements:
                      <Marginside />
                      Total available:
                    </Smalltext>
                  </Tableoutline>
                  <Pagetext>Units Shipped to Customer this week:</Pagetext>
                  <Pagetext>Ending Inventory:</Pagetext>
                  <Pagetext>
                    Enter the number of units to be purchased from upstreamer:
                    <input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="demand"
                      name="demand"
                      id="demand"
                      required
                    />
                    {inputerrormsg && (
                      <span style={{ color: "red" }}>{inputerrormsg}</span>
                    )}
                    {success && (
                      <span style={{ color: "green" }}>{success}</span>
                    )}
                    <Margintop />
                    <Pagebtn
                      style={{
                        position: "absolute",
                      }}
                    >
                      <Button smooth={true} alt="" onClick={handleSubmit}>
                        Submit
                      </Button>
                      <Button smooth={true} onClick={handleQuit}>
                        Quit Game
                      </Button>
                    </Pagebtn>
                  </Pagetext>
                </Pagetext>
              </Pagecontainer1>

              <Pagecontainer2>
                {/* screen 2*/}
                <h3>Past Information</h3>
                <table>
                  <thead>
                    <th>Week</th>
                    <th>Inv/Bk</th>
                    <th>Demand</th>
                    <th>Inc. Shipment</th>
                    <th>Out. Shipment</th>
                    <th>Order</th>
                    <th>Current cost</th>
                  </thead>
                  <tbody>
                    {Info.past_info.map((row) => (
                      <tr key={`week${row.week}`}>
                        <td>{row.week}</td>
                        <td>{row.inventory}</td>
                        <td>{row.demand}</td>
                        <td>{row.incoming_shipment}</td>
                        <td>{row.outgoing_shipment}</td>
                        <td>{row.order}</td>
                        <td>{row.current_cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Pagecontainer2>
            </Pagecontainer>

            <Pagecontainer>
              <Pagecontainer2>
                {" "}
                {/* screen 3*/}
                {!nextround && (
                  <Pagetext>
                    <Pagehead>
                      Status of other Supply Chain Channel Members of the Game
                    </Pagehead>
                    <Smalltext>
                      This page will be refreshed in{" "}
                      <span id="counter" style={{ color: "red" }}>
                        15
                      </span>
                      <Margintop />
                      When all the players have completed the order for the
                      current week, the player will automatically receive a link
                      to proceed to next week.
                    </Smalltext>
                    <Counttext>
                      The status will be updated in every 15 seconds.
                    </Counttext>
                    {success && (
                      <Counttext>
                        Your submission status will be reflected here soon
                      </Counttext>
                    )}
                    Week
                    <Margintop />
                    <Pagetext>Factory : {playersStatus.factory}</Pagetext>
                    <Pagetext>
                      Distributor : {playersStatus.distributor}
                    </Pagetext>
                    <Pagetext>Wholesaler : {playersStatus.wholesaler}</Pagetext>
                    <Pagetext>Retailer : {playersStatus.retailer}</Pagetext>
                  </Pagetext>
                )}
                {nextround && (
                  <>
                    <h1 style={{ color: "green" }}>
                      Click the link to proceed to next round
                    </h1>
                    <Button onClick={() => window.location.reload()}>
                      Next Round
                    </Button>
                  </>
                )}
              </Pagecontainer2>

              <Pagecontainer1>
                {" "}
                {/* screen 4*/}
                <Pagetext>
                  <Pagehead>Inventory and Order Status plots</Pagehead>
                  <Margintop />
                  <Pagetext>
                    <Pagebtn>
                      <Button
                        smooth={true}
                        alt=""
                        onClick={() => plot("demand")}
                      >
                        Customer Demand Plot
                      </Button>
                      <Marginside />
                      <Button
                        smooth={true}
                        alt=""
                        onClick={() => plot("inventory")}
                      >
                        Inv/Backorder Plot
                      </Button>
                    </Pagebtn>
                  </Pagetext>

                  <Margintop />
                  <Pagetext>
                    <Pagebtn>
                      <Button
                        smooth={true}
                        alt=""
                        onClick={() => plot("order")}
                      >
                        Order Plot
                      </Button>
                      <Marginside />
                      <Button smooth={true} alt="" onClick={() => plot("all")}>
                        Plot all
                      </Button>
                    </Pagebtn>
                  </Pagetext>

                  <Margintop />
                  <Margintop />
                  <Pagetext>Supply Chain Settings for the Player:</Pagetext>
                  <Margintop />
                  <Pagetext>Holding cost:</Pagetext>
                  <Pagetext>Backorder cost:</Pagetext>
                  <Pagetext>Downstream player: {downstream_player()}</Pagetext>
                  <Pagetext>Upstream player:</Pagetext>
                  <Pagetext>Delay:</Pagetext>
                </Pagetext>
              </Pagecontainer1>
            </Pagecontainer>
          </Gamecontainer>
        )}

        {isPlotting && (
          <>
            <div
              id="PlotSpace"
              className="chart"
              style={{
                backgroundColor: "White",
                margin: "10px",
                opacity: "0.95",
                display: "flexbox",
                alignItems: "center",
              }}
            >
              <LineChart data = {isPlotting} />
              <bootstrap.Button
                style={{ margin: "10px", float: "right", width: "inherit" }}
                onClick={() => setisPlotting(null)}
              >
                Back
              </bootstrap.Button>
            </div>
          </>
        )}
      </>
    );
  } else {
    return <h1 style={{ color: "green" }}>Loading... Please wait</h1>;
  }
};

export default Gamepage;
