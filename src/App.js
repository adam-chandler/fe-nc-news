import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import ArticlesList from "./Components/Articles/ArticlesList";
import { Router } from "@reach/router";
import Article from "./Components/Articles/Article";
import ErrorDisplay from "./Components/ErrorDisplay";
import Profile from "./Components/Profile";
import ArticleSubmitter from "./Components/Articles/ArticleSubmitter";

class App extends React.Component {
  state = {
    currUser: "jessjelly",
  };

  render() {
    const { currUser } = this.state;
    return (
      <div className="App">
        <Navbar currUser={currUser} />
        <Router>
          <ArticlesList path="/" />
          <ArticlesList path="/topics/:topic_slug" />
          <Article currUser={currUser} path="/article/:article_id" />
          <Profile currUser={currUser} path="/profile" />
          <ArticleSubmitter path="submit" />
          <ErrorDisplay default status="404" msg="Page not found" />
        </Router>
      </div>
    );
  }
}

export default App;
