import React, { Component } from "react";

class GoogleLogin extends Component {
  state = {
    profileName: null,
  };
  componentDidMount() {
    // Load the Google API client library
    if (window.gapi) {
      window.gapi.load("auth2", this.initClient);
    }
  }

  initClient = () => {
    // Initialize the Google API client with your client ID
    window.gapi.auth2.init({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: "email profile", // Add additional scopes as needed
      plugin_name: "chat",
      prompt: "consent",
    });
    window.gapi.auth2
      .getAuthInstance()
      .isSignedIn.listen(this.updateSignInStatus);
  };

  updateSignInStatus = (isSignedIn) => {
    console.log("signed in succesfully ..", isSignedIn);
    if (isSignedIn) {
      // User is signed in, get user details
      const profile = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile();
      console.log("Logged in as: " + profile.getName());
      this.setState({
        profileName: `<strong>${profile.getName()}</strong> Signed In!`,
      });
      // You can now perform actions with the user's information
    } else {
      console.log("User is Logged Out!");
      this.setState({ profileName: "User Signed out!" });
    }
  };

  handleSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  handleSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  render() {
    return (
      <div>
        <i className="user circle icon"></i>
        <span dangerouslySetInnerHTML={{ __html: this.state.profileName }} />
        <div className="ui horizontal hidden divider">
          <button onClick={this.handleSignInClick}>Sign In with Google</button>
          <button onClick={this.handleSignOutClick}>Sign Out</button>
        </div>
      </div>
    );
  }
}

export default GoogleLogin;
