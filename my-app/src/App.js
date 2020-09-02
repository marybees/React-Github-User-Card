import React from "react";
import axios from "axios";
import "./App.css";
// import Card from "./Card";

class App extends React.Component {
  state = {
    gitHubProfile: false,
    profileSearch: "",
    error: "",
  };

  // componentDidMount() {
  //   axios
  //     .get("https://api.github.com/users/marybees")
  //     .then((response) => {
  //       console.log(response.data);
  //       this.setState({
  //         gitHubProfiles: response.data
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("The data was not returned.", error);
  //     });
  // }

  handleChanges = (e) => {
    this.setState({
      profileSearch: e.target.value,
    });
  };

  fetchProfiles = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.profileSearch}`)
      .then((response) => {
        this.setState({
          gitHubProfile: response.data,
          error: "",
        });
      })
      .catch((err) => {
        this.setState({
          error:
            "Looks like we could not find that GitHub user. Please try again",
        });
      });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <h1>GitHub Profile Finder</h1>
          <img
            src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            className="App-logo"
            alt="logo"
          />
          <input
            type="text"
            value={this.state.profileSearch}
            onChange={this.handleChanges}
          />
          <button onClick={this.fetchProfiles}>Search</button>
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}
          {this.state.gitHubProfile && (
            <p style={{ color: "red" }}>{this.state.gitHubProfile.username}</p>
          )}
        </header>
        <div className="profiles">
          {this.state.gitHubProfile.id && (
            <div>
              <h2>{this.state.gitHubProfile.name}</h2>
              <h3>
                {this.state.gitHubProfile.login} |{" "}
                {this.state.gitHubProfile.location}
              </h3>
              <h3>
                {this.state.gitHubProfile.followers} Followers | Following{" "}
                {this.state.gitHubProfile.following}
              </h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
