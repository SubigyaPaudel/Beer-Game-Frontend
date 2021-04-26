import { Form, FormControl, InputGroup, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./edit_game.css";

//The first section is just composed of dummy data meant to be later retrieved from the server, you can ignore this part


/**
 * Component used to edit the game
 * 
 */
const EditGames = () => {
  var local_students = [
    {
      name: "Student 1",
      id: "1",
    },
    {
      name: "Student 2",
      id: "2",
    },
    {
      name: "Student 3",
      id: "3",
    },
    {
      name: "Student 4",
      id: "4",
    },
    {
      name: "Student 5",
      id: "5",
    },
    {
      name: "Student 6",
      id: "6",
    },
  ];

  var dummy_demand_patterns = [
    {
      id: "1",
      name: "Rollercoaster",
    },
    {
      id: "2",
      name: "The Classic",
    },
    {
      id: "3",
      name: "Exponential decay",
    },
    {
      id: "4",
      name: "Quadratic decay",
    },
    {
      id: "5",
      name: "Tester",
    },
  ];
  var dummy_data = {
    game_id: "0102",
    game_name: "Game 2",
    duration: "52",
    holding_cost: "0.5",
    backlog_cost: "3",
    information_delay: "1",
    shipping_delay: "1",
    wholesaler_present: "True",
    distributor_present: "False",
    running: "False",
    demand_pattern: "Tester",
    information_sharing: "Activated",
    starting_inventory: "10",
    retailer: {
      student_name: "Student 3",
      //attach other details for the students if you want
    },
    wholesaler: {
      student_name: "Student 1",
    },
    distributor: {
      student_name: "Student 2",
    },
    factory: {
      student_name: "Student 4",
    },
  };

  const [validated, setValidated] = useState(false);
  const [placeholders, setplaceholders] = useState(null);
  const [my_demand_patterns, set_demand_patterns] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [distributorPresent, setDistributorPresent] = useState(null);
  const [wholesalerPresent, setWholesalerPresent] = useState(null);
  const [students, setStudents] = useState(null);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const abortConst = new AbortController();
    setTimeout(() => {
      //simulating the process of retrieving data from the server
      if (dummy_data.wholesaler_present === "True") {
        setWholesalerPresent(true);
      } else {
        setWholesalerPresent(false);
      }
      if (dummy_data.distributor_present == "True") {
        setDistributorPresent(true);
      } else {
        setDistributorPresent(false);
      }
      setplaceholders(dummy_data);
      set_demand_patterns(dummy_demand_patterns);
      setStudents(local_students);
      setLoading(false);
      setErrors(false);
    }, 500);
    return () => {
      abortConst.abort();
    };
  }, [wholesalerPresent, distributorPresent]);

  const handleSubmit = (event) => {
    document.getElementById("game_name").classList.remove("is-invalid");
    const form = event.currentTarget;
    const testex = /(!|@|#|"|\^|%|\(|\)|-|_|:|;|\?)/;
    var game_name = document.getElementById("game_name").value;
    const is_invalid = game_name
      .split("")
      .map((element) => testex.test(element))
      .reduce((acc, current) => acc || current);
    console.log(is_invalid);
    if (is_invalid) {
      document.getElementById("game_name").classList.add("is-invalid");
    }
    if (form.checkValidity() === false || is_invalid) {
      document.getElementById("game_name").classList.remove("is-valid");
    } else {
      setSuccess(true);
      setTimeout(() => {
        history.push("");
      }, 1000);
    }
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        id="edit_game_form"
      >
        <h1>
          Edit game parameters for {placeholders && placeholders.game_name}
        </h1>
        {loading && <h5 style={{ color: "blue" }}>Loading.....</h5>}
        {errors && (
          <h5 style={{ color: "red" }}>
            Unable to retrieve current data. Please try again later
          </h5>
        )}
        {success && (
          <h2 style={{ color: "green" }}>
            The game parameters have been successfully uploaded
          </h2>
        )}
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>New name of the game</Form.Label>
            <InputGroup>
              <Form.Control
                required
                type="text"
                id="game_name"
                placeholder={placeholders && placeholders.game_name}
                defaultValue={placeholders && placeholders.game_name}
                controlId="validation1"
              />
              <Form.Control.Feedback type="invalid">
                Invalid game name
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
                Looks good
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Text>
              Game name cannot contain the following characters:
              !,@,#,",^,%,*,(,),_,-,:,;,?
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Demand Pattern</Form.Label>
            <Form.Control required as="select">
              {my_demand_patterns &&
                my_demand_patterns.map((demand_pattern) => {
                  if (demand_pattern.name !== placeholders.demand_pattern) {
                    return (
                      <option key={`demand_pattern${demand_pattern.id}`}>
                        {demand_pattern.name}
                      </option>
                    );
                  } else {
                    return (
                      <option
                        key={`demand_pattern${demand_pattern.id}`}
                        selected
                      >
                        {demand_pattern.name}
                      </option>
                    );
                  }
                })}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="4">
            {placeholders &&
              placeholders.information_sharing === "Activated" && (
                <Form.Check
                  type="switch"
                  id="information_switch"
                  label="Information Sharing"
                  defaultChecked
                />
              )}
            {placeholders &&
              placeholders.information_sharing !== "Activated" && (
                <Form.Check
                  type="switch"
                  id="information_switch"
                  label="Information Sharing"
                />
              )}
            {!placeholders && (
              <Form.Check
                type="switch"
                id="information_switch"
                label="Information Sharing"
              />
            )}
          </Form.Group>
          <Form.Group as={Col} md="4">
            {placeholders && placeholders.distributor_present === "True" && (
              <Form.Check
                type="switch"
                id="distributor_switch"
                label="Distributor Present"
                onChange={(event) =>
                  setDistributorPresent(event.target.checked)
                }
                defaultChecked
              />
            )}
            {placeholders && placeholders.distributor_present !== "True" && (
              <Form.Check
                type="switch"
                id="distributor_switch"
                onChange={(event) =>
                  setDistributorPresent(event.target.checked)
                }
                label="Distributor Present"
              />
            )}
            {!placeholders && (
              <Form.Check
                type="switch"
                id="distributor_switch"
                onChange={(event) =>
                  setDistributorPresent(event.target.checked)
                }
                label="Distributor Present"
              />
            )}
          </Form.Group>
          <Form.Group as={Col} md="4">
            {placeholders && placeholders.wholesaler_present === "True" && (
              <Form.Check
                type="switch"
                id="wholesaler_switch"
                label="Wholesaler present"
                onChange={(event) => setWholesalerPresent(event.target.checked)}
                defaultChecked
              />
            )}
            {placeholders && placeholders.wholesaler_present !== "True" && (
              <Form.Check
                type="switch"
                id="wholesaler_switch"
                onChange={(event) => setWholesalerPresent(event.target.checked)}
                label="Wholesaler present"
              />
            )}
            {!placeholders && (
              <Form.Check
                type="switch"
                id="wholesaler_switch"
                onChange={(event) => setWholesalerPresent(event.target.checked)}
                label="Wholesaler present"
              />
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Duration (Rounds)</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                min="1"
                step="1"
                placeholder={placeholders && placeholders.duration}
                defaultValue={placeholders && placeholders.duration}
                controlId="validation2"
              />
              <Form.Control.Feedback type="invalid">
                Duration must be a positive integer
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Holding Cost</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                placeholder={placeholders && placeholders.holding_cost}
                defaultValue={placeholders && placeholders.holding_cost}
                controlId="validation3"
              />
              <Form.Control.Feedback type="invalid">
                Holding cost must be a positive number
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Backlog Cost</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                placeholder={placeholders && placeholders.backlog_cost}
                defaultValue={placeholders && placeholders.backlog_cost}
                controlId="validation4"
              />
              <Form.Control.Feedback type="invalid">
                Backlog cost must be a positive number
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Starting Inventory</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                min="0"
                step="1"
                placeholder={placeholders && placeholders.starting_inventory}
                defaultValue={placeholders && placeholders.starting_inventory}
                controlId="validation5"
              />
              <Form.Control.Feedback type="invalid">
                Starting Inventory must be a positive integer
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Information Delay (Rounds)</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                min="0"
                step="1"
                placeholder={placeholders && placeholders.information_delay}
                defaultValue={placeholders && placeholders.information_delay}
                controlId="validation6"
              />
              <Form.Control.Feedback type="invalid">
                Information delay must be a positive integer
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Shipping Delay (Rounds)</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                min="0"
                step="1"
                placeholder={placeholders && placeholders.shipping_delay}
                defaultValue={placeholders && placeholders.shipping_delay}
                controlId="validation7"
              />
              <Form.Control.Feedback type="invalid">
                Shipping delay must be a positive integer
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <h2>Students</h2>
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Factory</Form.Label>
            <Form.Control required as="select">
              {students &&
                students.map((student) => {
                  if (student.name !== placeholders.factory.student_name)
                    return (
                      <option key={`factory_options_student_${student.id}`}>
                        {student.name}
                      </option>
                    );
                  else
                    return (
                      <option
                        key={`factory_options_student_${student.id}`}
                        selected
                      >
                        {student.name}
                      </option>
                    );
                })}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Distributor</Form.Label>
            {distributorPresent && (
              <Form.Control required as="select">
                {students &&
                  students.map((student) => {
                    if (student.name !== placeholders.distributor.student_name)
                      return (
                        <option
                          key={`distributor_options_student_${student.id}`}
                        >
                          {student.name}
                        </option>
                      );
                    else
                      return (
                        <option
                          key={`distributor_options_student_${student.id}`}
                          selected
                        >
                          {student.name}
                        </option>
                      );
                  })}
              </Form.Control>
            )}
            {!distributorPresent && (
              <Form.Control required as="select" disabled>
                {students &&
                  students.map((student) => {
                    if (student.name !== placeholders.distributor.student_name)
                      return (
                        <option
                          key={`distributor_options_student_${student.id}`}
                        >
                          {student.name}
                        </option>
                      );
                    else
                      return (
                        <option
                          key={`distributor_options_student_${student.id}`}
                          selected
                        >
                          {student.name}
                        </option>
                      );
                  })}
              </Form.Control>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Wholesaler</Form.Label>
            {wholesalerPresent && (
              <Form.Control required as="select">
                {students &&
                  students.map((student) => {
                    if (student.name !== placeholders.wholesaler.student_name)
                      return (
                        <option
                          key={`wholesaler_options_student_${student.id}`}
                        >
                          {student.name}
                        </option>
                      );
                    else
                      return (
                        <option
                          key={`wholesaler_options_student_${student.id}`}
                          selected
                        >
                          {student.name}
                        </option>
                      );
                  })}
              </Form.Control>
            )}
            {!wholesalerPresent && (
              <Form.Control required as="select" disabled>
                {students &&
                  students.map((student) => {
                    if (student.name !== placeholders.wholesaler.student_name)
                      return (
                        <option
                          key={`wholesaler_options_student_${student.id}`}
                        >
                          {student.name}
                        </option>
                      );
                    else
                      return (
                        <option
                          key={`wholesaler_options_student_${student.id}`}
                          selected
                        >
                          {student.name}
                        </option>
                      );
                  })}
              </Form.Control>
            )}
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Retailer</Form.Label>
            <Form.Control required as="select">
              {students &&
                students.map((student) => {
                  if (student.name !== placeholders.retailer.student_name)
                    return (
                      <option key={`retailer_options_student_${student.id}`}>
                        {student.name}
                      </option>
                    );
                  else
                    return (
                      <option
                        key={`retailer_options_student_${student.id}`}
                        selected
                      >
                        {student.name}
                      </option>
                    );
                })}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </>
  );
};

export default EditGames;
