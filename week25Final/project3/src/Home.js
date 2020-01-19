import React, { Component } from "react";
import Mistletoe from "../src/components/Images/mistletoe.jpg";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div>
            <button onClick={this.props.auth.login}>Log In</button>
          </div>
          <img src={Mistletoe} id="pic" alt="mistletoe"></img>
          <h1>Matt's Xmas Wish List</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
