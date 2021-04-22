import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./my_instructors.css";

const SingleInstructor = ({ data }) => {
  return (
    <li class="Instructor">
      <span>
        Name:{" "}
        <span style={{ fontWeight: "bold", color: "blue" }}>{data.name}</span>
        Email:
        <span style={{ fontWeight: "bold", color: "red" }}>{data.email}</span>
      </span>
    </li>
  );
};

const MyInstructors = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);

  var dummy_data = [
    {
      name: "Professor A",
      email: "p.a@uni.edu",
    },
    {
      name: "Professor B",
      email: "p.b@uni.edu",
    },
    {
      name: "Professor C",
      email: "p.c@uni.edu",
    },
    {
      name: "Professor D",
      email: "p.d@uni.edu",
    },
    {
      name: "Professor E",
      email: "p.e@uni.edu",
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
      id="my_Instructors"
    >
      <h1 style={{ marginLeft: "20px" }}>My Instructors</h1>
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
            return <SingleInstructor data={element} />;
          })}
      </ol>
    </div>
  );
};

export default MyInstructors;
