import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  state = {
    gitHubProfiles: ['marybees', 'willwashburn', 'khaliqgant', 'jtarre', 'mphelps1978'],
    profileSearch: '',
    error: ''
  };

  componentDidMount() {
    gitHubProfiles.forEach(username => {
      // const profileURL = 'https://api.github.com/users/' + username;
      axios.get(profileURL)
    .then(response => {
      this.setState({
        githubProfiles: response.data
      })
    })
      .catch(error => {
        console.log("The data was not returned.", error)
      });
    });
  }

  handleChanges = e => {
    this.setState({
      profileSearch: e.target.value
    });
  };

  fetchProfiles = e => {
    e.preventDefault();
    axios
      // .get(`https://api.github.com/users/${this.state.profileSearch}`)
      .then(response => {
        this.setState({
          gitHubProfiles: response.data.message,
          error: ''
        });
      })
      .catch(err => {
        this.setState({
          error: 'Looks like we could not find that GitHub user. Please try again'
        });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>'GitHub Profile Finder'</h1>
          <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
