import React, { Component } from "react";

import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

import "tachyons";
import "./App.css";

const SERVER_IP = process.env.REACT_APP_SERVER_URL;
console.log("process", SERVER_IP);


const initialState = {
  input: "",
  imageUrl: "",
  box: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onImageSubmit = (event) => {
    this.setState({ imageUrl: this.state.input });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: this.state.input,
      }),
    };
    fetch(`${SERVER_IP}/imageApi`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result) {
          const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          };
          fetch(`${SERVER_IP}/image`, requestOptions)
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((error) => console.error("error", "could not reach server"));
          this.displayBoundingBoxes(this.calculateFaceLocation(result));
        }
      })
      .catch((error) => console.error("error", "could not access api"));
  };
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };
  calculateFaceLocation = (result) => {
    const resultObj = JSON.parse(result);
    const image = document.getElementById("inputImage");
    const height = +image.height;
    const width = +image.width;
    const regions = resultObj.outputs[0].data.regions;

    return regions.map((item) => {
      const bounds = item.region_info.bounding_box;
      return {
        top: bounds.top_row * height,
        bottom: height - bounds.bottom_row * height,
        left: bounds.left_col * width,
        right: width - bounds.right_col * width,
      };
    });
  };
  displayBoundingBoxes = (box) => {
    this.setState({ box });
  };
  onRouteChange = (route) => {
    console.log("onRouteChange", route);
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  };
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    const { name, entries } = this.state.user;
    return (
      <div className="App">
        <ParticlesBackground />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <>
            <Logo />
            <Rank name={name} entries={entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onImageSubmit={this.onImageSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </>
        ) : route === "register" ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
