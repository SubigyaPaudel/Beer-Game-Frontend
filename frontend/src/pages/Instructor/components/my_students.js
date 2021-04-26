import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./my_students.css";

/**
 * Component to render the information about a single student
 * @param {data} param0 
 * @returns {}
 */

const SingleStudent = ({ data }) => {
  return (
    <li class="student">
      <span>
        Name:{" "}
        <span style={{ fontWeight: "bold", color: "blue" }}>{data.name}</span>
        Email:
        <span style={{ fontWeight: "bold", color: "red" }}>{data.email}</span>
        <Button size="sm" variant="outline-danger">
          Remove Student
        </Button>
      </span>
    </li>
  );
};

/**
 * Component that renders the information about all the students that are 
 * affiliated to the instructor
 * 
 * @returns {}
 */

const MyStudents = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);

  var dummy_data = [
    {
      name: "Aaron Paul",
      email: "aa.paul@bb.com",
    },
    {
      name: "Jesse Pinkman",
      email: "JP@notmorgan_and_chase,com",
    },
    {
      name: "Heisenberg",
      email: "bluedreams@money.com",
    },
    {
      name: "Hank Schraeder",
      email: "h.schraeder@dea.gov",
    },
    {
      name: "Flynn White",
      email: "flynn@breakfast.com",
    },
  ];

  useEffect(() => {
    const AbortConst = new AbortController();
    setTimeout(() => {
      //fetch_data from the API and set it using setData hook and use the loading and the error states accordingly
      setData(dummy_data);
      setLoading(false);
      setErrors(false);
    }, 1000);
    return () => AbortConst.abort();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        margin: "20px",
        padding: "5px",
        marginTop: "20px",
      }}
      id="my_students"
    >
      <h1 style={{ marginLeft: "20px" }}>My Students</h1>
      {loading && (
        <h5 style={{ color: "green", marginLeft: "20px" }}>Loading....</h5>
      )}
      {errors && (
        <h5 style={{ color: "red", marginLeft: "20px" }}>
          Unable to retrieve data...
        </h5>
      )}
      <ol>
        {data &&
          data.map((element) => {
            return <SingleStudent data={element} />;
          })}
      </ol>
    </div>
  );
};

export default MyStudents;
