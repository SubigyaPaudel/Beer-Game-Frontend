import { useState, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

/**
 * 
 * @param {week_number} param0 
 * @returns Input component which takes each week's demand
 */

const EachWeekInput = ({ week }) => {
  return (
    <InputGroup style={{ marginTop: "3px", marginBottom: "3px" }}>
      <InputGroup.Prepend>
        <InputGroup.Text>Customer demand on week {week}</InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control
        required
        type="number"
        min="0"
        step="1"
      />
    </InputGroup>
  );
};

/**
 * Component to create demand patterns
 * 
 */

const CreateDemandPattern = () => {
  const history = useHistory();
  const [redirecting, setRedirecting] = useState(false);
  const [weeks, setweeks] = useState(false);
  const changeweeks = (e) => {
    let week = parseInt(e.target.value);
    if (week === 0) {
      setweeks(false);
    } else {
      let weeks = [];
      for (let i = 1; i <= week; i++) weeks.push(i);
      setweeks(weeks);
      console.log(weeks);
    }
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    let customerdemand = [];
    document.querySelectorAll("#demands input").forEach((elem) => {
      customerdemand.push(elem.value);
    });
    let weeks = customerdemand.length;
    let demand_pattern_name = document.getElementById("demand_pattern_name")
      .value;
    var data = {
      weeks: weeks,
      name: demand_pattern_name,
      customer_demand: customerdemand,
    };
    data = JSON.stringify(data);
    console.log(data);
    // Make API calls to store the data
    setRedirecting(true);
    setTimeout(() => {
        history.push("");
    }, 5000)
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        opacity: "0.9",
        padding: "5px",
        margin: "10px",
      }}
    >
      {!redirecting && <><h1 style={{ color: "red" }}>Create a new demand pattern</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup style={{ marginTop: "3px", marginBottom: "3px" }}>
          <InputGroup.Prepend>
            <InputGroup.Text>Name of the Demand Pattern</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control id="demand_pattern_name" required type="text" />
        </InputGroup>
        <InputGroup style={{ marginTop: "3px", marginBottom: "3px" }}>
          <InputGroup.Prepend>
            <InputGroup.Text>Number of weeks</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control class = "demands" required type="number" min="0" onChange={changeweeks} />
        </InputGroup>
        <div id = "demands">
            {weeks && (
            <h1 style={{ color: "green", float: "center" }}>Customer Demands</h1>
            )}
            {weeks && weeks.map((weekno) => <EachWeekInput week={weekno} />)}
        </div>
        <Button
          type="submit"
          variant="success"
          style={{ float: "right", marginTop: "10px" }}
        >
          Create Demand Pattern
        </Button>
      </Form>
      </>}
      {redirecting && <h1 style = {{color:"green"}}>Demand Pattern Created, redirecting you to the main page</h1>}
    </div>
  );
};

export default CreateDemandPattern;
