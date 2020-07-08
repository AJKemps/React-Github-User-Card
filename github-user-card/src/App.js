import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = {
    username: "ajkemps",
    name: "",
    bio: "",
    image: "",
    followers: [],
  };

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/${this.state.username}`)
      .then((res) => {
        console.log(res.data);

        this.setState({
          username: res.data.login,
          name: res.data.name,
          bio: res.data.bio,
          image: res.data.avatar_url,
        });

        console.log(this.state);
      });

    axios
      .get(`https://api.github.com/users/${this.state.username}/followers`)
      .then((res) => {
        console.log(res.data);

        const followersList = res.data.map((follower) => follower.login);
        console.log("followers:", followersList);
        this.setState({
          followers: followersList,
        });
        console.log(this.state.followers);
      });
  }

  handleChanges = (event) => {
    this.setState({
      username: event.target.value,
    });
    console.log("handleChange:", this.state.username);
  };

  fetchUser = (event) => {
    event.preventDefault();
    this.componentDidMount();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Github User Card</h1>
          <h3>React Class Components</h3>
        </header>

        <form>
          <h4>Select Github User</h4>
          <select onChange={this.handleChanges}>
            <option value="ajkemps">Alex Kemper</option>
            <option value="JuniorDugue">Junior Dugue</option>
          </select>
          <button onClick={this.fetchUser}>Get User Info</button>
        </form>

        <div className="usercard">
          <img src={this.state.image} />
          <h4>Name: {this.state.name}</h4>
          <h5>Username: {this.state.username}</h5>
          <p>Bio: {this.state.bio}</p>
          <ol>
            Followers:{" "}
            {this.state.followers.map((follower) => {
              return <li>{follower}</li>;
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
