import "./SearchForm.css";
import React from "react";

function template() {
  return (
    <div className="search-form">
      <h1>SearchForm</h1>
      <form onSubmit={this.props.getHotel}>
                <input style={{margin:"20px auto",display:"block"}} type='text' name="username" />
                <button  >Search</button>
              </form>
    </div>
  );
};

export default template;
