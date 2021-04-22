import "./my_games.css";
import { useEffect, useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router";

const OneGame = ({ data }) => {
  const history = useHistory();
  const {url, path} = useRouteMatch();
  const pause_this_game = (event) => {
    const game_id = event.target.dataset.game_id;
    const pausable = document.querySelector(`#a${game_id} span`).innerHTML;
    var messages = document.querySelector(`#a${game_id} .messages`);
    if (pausable == "False") {
      messages.style.color = "Red";
      messages.innerHTML = "The game is not running, so cannot pause";
    } else {
      //fetch() call a RESTAPI to pause the game
      document.querySelector(`#a${game_id} span`).innerHTML = "False";
      messages.style.color = "Green";
      messages.innerHTML = "The game has been paused";
    }
    setTimeout(() => {
      messages.innerHTML = "";
    }, 2000);
  };

  const edit_game = (event) => {
    const game_id = event.target.dataset.game_id;
    const running = document.querySelector(`#a${game_id} span`).innerHTML;
    var messages = document.querySelector(`#a${game_id} .messages`);
    if (running == "True") {
      messages.style.color = "Red";
      messages.innerHTML =
        "Game is being played, so cannot edit the game parameters";
      setTimeout(() => {
        messages.innerHTML = "";
      }, 2000);
    } else {
      history.push(`${path}/gamepage/:${game_id}`);
    }
  };
  return (
    <Card key={data.game_id}>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={data.game_id}>
          <h3>{data.game_name}</h3>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={data.game_id}>
        <Card.Body id={"a" + data.game_id}>
          <h5>Game details</h5>
          <ul>
            <li className="game_duration">
              <h6>Game Duration: {data.duration}</h6>
            </li>
            <li className="holding_cost">
              <h6>Holding Cost: {data.holding_cost} </h6>
            </li>
            <li className="backlog_cost">
              <h6>Backlog Cost: {data.backlog_cost} </h6>
            </li>
            <li className="information_delay">
              <h6>Information Delay: {data.information_delay}</h6>
            </li>
            <li className="shipping_delay">
              <h6>Shipping delay: {data.shipping_delay}</h6>
            </li>
            <li className="information_sharing">
              <h6>Info-sharing: {data.information_sharing}</h6>
            </li>
          </ul>
          <h3>
            Instructor :{" "}
            <span style={{ color: "blue" }}>{data.instructor.name}</span>
          </h3>
          <h5>Remarks</h5>
          <button
            className="btn btn-primary play_button"
            id="Edit_params"
            onClick={edit_game}
            data-game_id={data.game_id}
            style={{ float: "right", marginBottom: "2%" }}
          >
            Play this game
          </button>
          <br />
          <span className="messages" style={{ color: "blue" }}></span>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

var dummy_data = [
  {
    game_id: "0101",
    game_name: "Game 1",
    duration: "26 weeks",
    holding_cost: "0.5 units",
    backlog_cost: "1 unit",
    information_delay: "2 weeks",
    shipping_delay: "2 weeks",
    wholesaler_present: "True",
    distributor_present: "True",
    running: "True",
    demand_pattern: "Tester",
    information_sharing: "Activated",
    retailer: {
      student_name: "Student_ 1",
      //attach other details for the students if you want
    },
    wholesaler: {
      student_name: "Student_2",
    },
    distributor: {
      student_name: "Student_3",
    },
    factory: {
      student_name: "Student_4",
    },
    instructor: {
      name: "James Lee",
    },
  },
  {
    game_id: "0102",
    game_name: "Game 2",
    duration: "52 weeks",
    holding_cost: "0.5 units",
    backlog_cost: "3 unit",
    information_delay: "1 weeks",
    shipping_delay: "1 weeks",
    wholesaler_present: "True",
    distributor_present: "False",
    running: "False",
    demand_pattern: "Tester",
    information_sharing: "Activated",
    retailer: {
      student_name: "Student_ 3",
      //attach other details for the students if you want
    },
    wholesaler: {
      student_name: "Student_1",
    },
    distributor: {
      student_name: "Student_2",
    },
    factory: {
      student_name: "Student_4",
    },
    instructor: {
      name: "Max Mustermann",
    },
  },
];

const My_Games = () => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [game_data, setGamedata] = useState(null);
  useEffect(() => {
    const abortConst = new AbortController();
    setTimeout(() => {
      /*
      when the server is set up
        fetch(url).then((data) => return data.json()).then((data) => {setGamedata(data), setloading(false)}).catch(() => seterror(false))
        */
      setGamedata(dummy_data);
      setloading(false);
    }, 1000);
    return () => abortConst.abort();
  }, []);
  return (
    <div id="accordion">
      <h1>My Games</h1>
      {loading && <h3 style={{ color: "green" }}> Loading....</h3>}
      {error && <h3> Unable to load data, please try again later</h3>}
      <Accordion
        defaultActiveKey="0"
        style={{ margin: "10px" }}
        id="actual_accordion"
      >
        {game_data && game_data.map((element) => <OneGame data={element} />)}
      </Accordion>
    </div>
  );
};

export default My_Games;
