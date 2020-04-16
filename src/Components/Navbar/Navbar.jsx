import React from "react";
import TopicList from "./TopicList";
import { Link } from "@reach/router";
import * as api from "../../Utils/api";

class Navbar extends React.Component {
  state = {
    navBarActive: false,
    topicListActive: false,
    topics: [],
  };

  componentDidMount() {
    api.getTopics().then(({ topics }) => {
      this.setState({ topics: topics });
    });
  }

  render() {
    const menuItems = [
      { name: "Home", icon: "home", link: "/" },
      { name: "Topics", icon: "library", link: "/" },
      { name: "Users", icon: "people", link: "users" },
      { name: "Submit", icon: "create", link: "create" },
    ];

    const { currUser } = this.props;
    const { navBarActive, topicListActive, topics } = this.state;

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
                  <li
                    key={item.name}
                    onMouseEnter={
                      item.name === "Topics" ? this.handleMouseEnter : null
                    }
                    onMouseLeave={
                      item.name === "Topics" ? this.handleMouseLeave : null
                    }
                  >
                    <span className="navIcon">
                      <ion-icon name={item.icon} />
                    </span>
                    <span>
                      <Link to={item.link}>{item.name}</Link>
                    </span>
                    <div className="topiclistcontainer">
                      {" "}
                      {item.name === "Topics" && topicListActive ? (
                        <TopicList topics={topics} />
                      ) : null}
                    </div>
                  </li>
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
