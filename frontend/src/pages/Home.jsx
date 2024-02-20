import React, { Component } from "react";
import Navigation from "../components/Navigation";
import "../styles/style.scss";

export class Home extends Component {
  render() {
    return (
      <div>
        <Navigation />

        <h1>Page d'accueil</h1>
      </div>
    );
  }
}

export default Home;
