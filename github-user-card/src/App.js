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
            <option value="dhoesle">Danny Hoesle</option>
            <option value="sigij5">Sigi Jaeckel</option>
            <option value="MaryamMosstoufi">Maryam Mosstoufi</option>
            <option value="Impulse2020">Jeff Gallion</option>
            <option value="natethegreat5413">Nate Cowley</option>
            <option value="jcrobles1989">Jose Robles</option>
            <option value="JDMTias">Matias Iturbide</option>
          </select>
          <button onClick={this.fetchUser}>Get User Info</button>
        </form>

        <div className="usercard">
          <img src={this.state.image} />
          <h4>Name</h4> <p>{this.state.name}</p> <h4>Username </h4>{" "}
          <p>{this.state.username}</p> <h4>Bio</h4> <p>{this.state.bio}</p>
          <div>
            <h4>Followers: </h4>
            {this.state.followers.map((follower) => {
              return <p>{follower}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
