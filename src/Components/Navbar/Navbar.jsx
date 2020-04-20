import React from "react";
import TopicList from "./TopicList";
import { Link } from "@reach/router";
import * as api from "../../Utils/api";
import Loader from "../Loader";
import ErrorDisplay from "../ErrorDisplay";

class Navbar extends React.Component {
  state = {
    navBarActive: false,
    topicListActive: false,
    topics: [],
    isLoading: true,
    isError: false,
  };

  componentDidMount() {
    api
      .getTopics()
      .then(({ topics }) => {
        this.setState({ topics: topics, isLoading: false });
      })
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
    const menuItems = [
      { name: "Home", icon: "home", link: "/" },
      { name: "Topics", icon: "library", link: "/" },
      { name: "Profile", icon: "people", link: "profile" },
      { name: "Submit", icon: "create", link: "submit" },
    ];

    const { currUser } = this.props;
    const {
      navBarActive,
      topicListActive,
      topics,
      isLoading,
      isError,
      status,
      msg,
    } = this.state;

    if (isLoading) return <Loader />;
    if (isError) return <ErrorDisplay status={status} msg={msg} />;
    return (
      <>
        <header className="navbar">
          <div className="menuButton" onClick={this.handleShowNavbar}>
            <span className="menuIcon">
              {" "}
              <ion-icon name="menu" />
            </span>
          </div>
          <div className="navbar__top">
            <h1 className="nav_title">
              <span className="red">N</span>orthcoders'
              <span className="red">N</span>ews
            </h1>
          </div>
          <div
            className={
              navBarActive ? "navbar__bottom active" : "navbar__bottom"
            }
          >
            <ul className="nav_links_list">
              {menuItems.map((item) => {
                return (
                  <div
                    key={item.name}
                    onMouseEnter={
                      item.name === "Topics" ? this.handleMouseEnter : null
                    }
                    onMouseLeave={
                      item.name === "Topics" ? this.handleMouseLeave : null
                    }
                  >
                    <Link to={item.link}>
                      <li className="navButton">
                        <span className="navIcon">
                          <ion-icon name={item.icon} />
                        </span>
                        <span>{item.name}</span>
                      </li>
                    </Link>
                    <div className="topiclistcontainer">
                      {" "}
                      {item.name === "Topics" && topicListActive ? (
                        <TopicList topics={topics} />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </ul>
            <div className="userWelcome">Welcome, {currUser}</div>
          </div>
        </header>
      </>
    );
  }

  handleMouseEnter = () => {
    this.setState((currState) => {
      return { topicListActive: !currState.topicListActive };
    });
  };

  handleMouseLeave = () => {
    this.setState((currState) => {
      return { topicListActive: !currState.topicListActive };
    });
  };

  handleShowNavbar = () => {
    this.setState((currState) => {
      return { navBarActive: !currState.navBarActive };
    });
  };
}

export default Navbar;
