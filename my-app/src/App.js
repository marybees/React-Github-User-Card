import React from "react";
import axios from "axios";
import "./App.css";
import { Button } from '@material-ui/core'

class App extends React.Component {
  state = {
    gitHubProfile: false,
    profileSearch: "",
    error: "",
  };

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
        <div className="header">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            className="App-logo"
            alt="logo"
          />
          <h1>GitHub Profile Finder</h1>
        </div>
        <div className="search">
          <div className='search-box'><input
            type="text"
            value={this.state.profileSearch}
            onChange={this.handleChanges}
          /></div>
          <Button variant='outlined' color='primary' onClick={this.fetchProfiles}>Search</Button>
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}
          {this.state.gitHubProfile && (
            <p style={{ color: "red" }}>{this.state.gitHubProfile.username}</p>
          )}
        </div>
        <div className="profile-container">
          {this.state.gitHubProfile.id && (
            <div className="profile">
              <h2>{this.state.gitHubProfile.name}</h2>
              <h3>{this.state.gitHubProfile.login} | {this.state.gitHubProfile.location}</h3>
              <h3>{this.state.gitHubProfile.followers} Followers | Following {this.state.gitHubProfile.following}</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
