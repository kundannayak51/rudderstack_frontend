import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./DetailsPage.css";
import Modal from "./Modal";

const DetailsPage = () => {
  const location = useLocation();
  const response = location.state.res || {};
  const category = response.fields.category;
  const apiKey = response.fields.apiKey;
  const useHTTP = response.fields.useHTTP;
  const [formObj, setFormObj] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if((!formObj.apiKey && apiKey.required) || (!formObj.category && category.required) || (!formObj.useHTTP && useHTTP.required) )
    {
      setErrorMsg("All input field required");
      return;
    }
    if (!validateApiKey(formObj.apiKey)) {
      setErrorMsg("Invalid apiKey value!");
      return;
    }
    async function postData() {
      const res = await fetch("http://localhost:8080/source", {
        method: "POST",
        // headers: { userId: "2" },
        body: JSON.stringify({
          type: response.type,
          user_id: 1,
          data: { ...formObj },
        }),
      }).then((res) => res.json()).then((data) => data);
      if (res.message) {
        setShowModal(true);
      } else {
        alert("Error: Could not save");
      }
    }
    postData();
  };

  const validateApiKey = (value) => {
    const regex = new RegExp(apiKey.regex);
    return regex.test(value);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <form className="formBox" type="submit">
        <p className="error">{errorMsg}</p>
        <div className="formDiv">
          <label>
            apiKey <span className="required">*</span>
          </label>
          <input
            type="input"
            className="inputYle"
            required={apiKey.required}
            placeholder={apiKey.placeholder}
            onChange={(e) => {
              setFormObj({ ...formObj, apiKey: e.target.value });
            }}
          ></input>
        </div>
        <div>
          {useHTTP.label}
          <input
            required={useHTTP.required}
            type="checkbox"
            className="inputCheck"
            onChange={(e) => {
              setFormObj({ ...formObj, useHTTP: e.target.checked });
            }}
          ></input>
        </div>
        <div></div>
        <select
          value={formObj.category}
          className="selectCat"
          required={category.required}
          onChange={(e) => {
            setFormObj({ ...formObj, category: e.target.value });
          }}
        >
          <option disabled={true} value="" className="optionsYle">
            {category?.label}
          </option>
          {category?.options?.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.value}
          </option>
        ))}
        </select>
        <button className="submitBtn" onClick={handleSubmit}>
          submit
        </button>
      </form>
      {showModal && (
        <Modal message="Source created successfully!" closeModal={closeModal} />
      )}
    </div>
  );
};

export default DetailsPage;
