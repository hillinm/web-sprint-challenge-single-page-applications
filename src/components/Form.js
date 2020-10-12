import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";



export default function Form() {
    // managing state for our form inputs
    const [formState, setFormState] = useState({
      name: "",
      email: "",
      size: "",
      pepperoni: "",
      mushroom: "",
      sausage: "",
      olives: "",
      pineapple: "",
      ham: "",
      onions: "",
      specialinstructions: "",
    });

// server error
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    size: "",
    pepperoni: "",
    mushroom: "",
    sausage: "",
    olives: "",
    pineapple: "",
    ham: "",
    onions: "",
    specialinstructions: "",
  });

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
        size: "",
        pepperoni: "",
        mushroom: "",
        sausage: "",
        olives: "",
        pineapple: "",
        ham: "",
        onions: "",
        specialinstructions: "",
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
    size: yup.string().required("Please Select Size"),
    pepperoni: yup.boolean(),
    mushroom: yup.boolean(),
    sausage: yup.boolean(),
    olives: yup.boolean(),
    pineapple: yup.boolean(),
    ham: yup.boolean(),
    onions: yup.boolean(),
    specialinstructions: yup.string(),
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
          data-cy="name"
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
          data-cy="email"
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
        </label>
        </div>
        <label htmlFor="size">
        What Size Pizza?
        <select
          id="size"
          name="size"
          value={formState.size}
          onChange={inputChange}
        >
          <option>--Choose One--</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        {errors.size.length > 0 ? (
          <p className="error">{errors.size}</p>
        ) : null}
        </label>

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
        <label htmlFor="sausage" className="sausage">
            <input
            type="checkbox"
            id="sausage"
            name="sausage"
            checked={formState.sausage}
            onChange={inputChange}
            />
            Sausage
            {errors.sausage.length > 0 ? (
            <p className="error">{errors.sausage}</p>
            ) : null}
        </label>        
        <label htmlFor="olives" className="olives">
            <input
            type="checkbox"
            id="olives"
            name="olives"
            checked={formState.olives}
            onChange={inputChange}
            />
            Olives
            {errors.olives.length > 0 ? (
            <p className="error">{errors.olives}</p>
            ) : null}
        </label>
        <label htmlFor="pineapple" className="pineapple" >
            <input
            type="checkbox"
            id="pineapple"
            name="pineapple"
            checked={formState.pineapple}
            onChange={inputChange}
            />
            Pineapple
            {errors.pineapple.length > 0 ? (
            <p className="error">{errors.pineapple}</p>
            ) : null}
        </label>
        <label htmlFor="ham" className="ham">
            <input
            type="checkbox"
            id="ham"
            name="ham"
            checked={formState.ham}
            onChange={inputChange}
            />
            Ham
            {errors.ham.length > 0 ? (
            <p className="error">{errors.ham}</p>
            ) : null}
        </label>        
        <label htmlFor="onions" className="onions">
            <input
            type="checkbox"
            id="onions"
            name="onions"
            checked={formState.onions}
            onChange={inputChange}
            />
            Onions
            {errors.onions.length > 0 ? (
            <p className="error">{errors.onions}</p>
            ) : null}
        </label>
        </div>

      <label htmlFor="specialinstructions">
        Special Instructions:
        <textarea
          id="specialinstructions"
          name="specialinstructions"
          value={formState.specialinstructions}
          onChange={inputChange}
        />
        {errors.specialinstructions.length > 0 ? (
          <p className="error">{errors.specialinstructions}</p>
        ) : null}
      </label>
      <div>
      <button type="submit" data-cy='submit'>
        Submit
      </button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
      </div>            
    </form>
  );
}