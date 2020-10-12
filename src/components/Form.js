import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";


export default function Form() {
    // managing state for our form inputs
    const [formState, setFormState] = useState({
      name: "",
      email: "",
      pepperoni: "",
    });

// server error
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pepperoni: "",
  });

    // control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

    // managing state for errors. empty unless inline validation (validateInput) updates key/value pair to have error
  
    // temporary state used to display response from API. this is not a commonly used convention
    const [post, setPost] = useState([]);
  
    // inline validation, validating one key/value pair at a time
    const validateChange = (e) => {
      yup
        .reach(formSchema, e.target.name)
        .validate(
          e.target.type === "checkbox" ? e.target.checked : e.target.value
        )
        .then((valid) => {
          setErrors({ ...errors, [e.target.name]: "" });
        })
        .catch((err) => {
          setErrors({ ...errors, [e.target.name]: err.errors[0] });
        });
    };

// onSubmit function
  const formSubmit = (e) => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formState).then((response) => {
      console.log(response);
      setPost(response.data);
      setFormState({
        name: "",
        email: "",
      });
    });
  };

  const inputChange = (e) => {
    e.persist();
    const newFormState = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormState);
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    pepperoni: yup.boolean().oneOf([true])
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log("is my form valid", valid);
      setButtonIsDisabled(!valid);
    });
  }, [formSchema, formState]);
  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="text"
          name="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
        </label>
        <label htmlFor="pepperoni" className="pepperoni">
        <input
          type="checkbox"
          id="pepperoni"
          name="pepperoni"
          checked={formState.pepperoni}
          onChange={inputChange}
        />
        Pepperoni
        {errors.pepperoni.length > 0 ? (
          <p className="error">{errors.pepperoni}</p>
        ) : null}
      </label>
      <button type="submit" disabled={buttonIsDisabled}>
        Submit
      </button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
  );
}