import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";



export default function Form() {
    // managing state for our form inputs
    const [formState, setFormState] = useState({
      name: "",
      email: "",
      pepperoni: "",
      mushroom: "",
      sausage: "",
      olives: "",
      pineapple: "",
      ham: "",
      onions: "",
    });

// server error
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pepperoni: "",
    mushroom: "",
    sausage: "",
    olives: "",
    pineapple: "",
    ham: "",
    onions: "",
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
        pepperoni: "",
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
    pepperoni: yup.boolean(),
    mushroom: yup.boolean(),
    sausage: yup.boolean(),
    olives: yup.boolean(),
    pineapple: yup.boolean(),
    ham: yup.boolean(),
    onions: yup.boolean(),
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log("is my form valid", valid);
      setButtonIsDisabled(!valid);
    });
  }, [formSchema, formState]);
  return (
    <form onSubmit={formSubmit}>
    <div className="contact">
    <h1>Contact Information</h1>
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
        </div>
        <div className="toppings">
        <h1>Toppings</h1>
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
        <label htmlFor="mushroom" className="mushroom">
            <input
            type="checkbox"
            id="mushroom"
            name="mushroom"
            checked={formState.mushroom}
            onChange={inputChange}
            />
            Mushroom
            {errors.mushroom.length > 0 ? (
            <p className="error">{errors.mushroom}</p>
            ) : null}
        </label>
        </div>
      <div>
      <button type="submit" disabled={buttonIsDisabled}>
        Submit
      </button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
      </div>

    </form>
  );
}