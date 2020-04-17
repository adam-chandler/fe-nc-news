import React from "react";
import * as api from "../Utils/api";
import Loader from "./Loader";
import ErrorDisplay from "./ErrorDisplay";

class Profile extends React.Component {
  state = {
    isLoading: true,
    username: "",
    name: "",
    avatar_url: "",
    isError: false,
  };

  componentDidMount() {
    api
      .getUser(this.props.currUser)
      .then(({ user }) => this.setState({ ...user, isLoading: false }))
      .catch((err) => {
        const { data, status } = err.response;
        this.setState({
          isError: true,
          isLoading: false,
          msg: data.msg,
          status,
        });
      });
  }

  render() {
    const {
      isLoading,
      username,
      name,
      avatar_url,
      msg,
      status,
      isError,
    } = this.state;
    if (isLoading) return <Loader />;
    if (isError) return <ErrorDisplay msg={msg} status={status} />;
    return (
      <div className="profile">
        <img src={avatar_url} alt="User avatar" />
        <h3>{name}</h3>
        <h2>{username}</h2>
      </div>
    );
  }
}

export default Profile;
