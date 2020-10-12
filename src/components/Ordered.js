
import React from "react";



const Ordered = props => {

  return (
    <div className="team-list">
    <h1>Ordered</h1>
      {props.team.map((customer, index) => (
        <div className="note" key={customer.name}>
          <h2>{customer.name}</h2>
          <p>{customer.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Ordered;