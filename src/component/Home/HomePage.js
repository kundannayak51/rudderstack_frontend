import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedVal, setSelectedVal] = useState("");
  const [options, setOptions] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8080/all-source-types", {
        method: "GET",
        // headers: {
        //   "access-control-allow-origin" : "*",
        //   "Content-type": "application/json; charset=UTF-8"
        // }
      })
        .then((res) => res.json())
        .then((data) => setOptions(data));
    }
    fetchData();
  }, []);

  console.log(options, "res");

  const handleSelectClick = async () => {
    // navigate("/details");
    try {
      const res = await fetch(`http://localhost:8080/source-template/${selectedVal}`, {
        method: "GET",
      }).then((res) => res.json()).then((data) => data);
      console.log(res, "jjjjj");
      navigate("/details", { state: { res: res } });
      
    } catch (e) {
      throw e;
    }
  };
  const handleChange = (e) => {
    setSelectedVal(e.target.value);
  };
  console.log(selectedVal);
  return (
    <div className="mainContainer">
      <h2 className="title">Rudderstack </h2>
      <div className="containerY">
        <select
          value={selectedVal}
          onChange={handleChange}
          className="selectSource"
        >
          <option disabled={true} value="" className="optionsYle">
            Select source type
          </option>
          {options?.map((item, idx) => (
            <option key={idx} value={item.type}>
              {item.type}
            </option>
          ))}
        </select>
        <button onClick={handleSelectClick} className="selectBtn">
          select
        </button>
      </div>
    </div>
  );
};

export default HomePage;
