import React from "react";
import * as api from "../../Utils/api";

import Comments from "./Comments";
import Loader from "../Loader";

class Article extends React.Component {
  state = {
    author: "",
    title: "",
    article_id: -1,
    body: "",
    topic: "",
    created_at: "",
    votes: 0,
    comment_count: "",
    isLoading: true,
  };

  componentDidMount() {
    api.getArticle(this.props.article_id).then(({ article }) => {
      this.setState({ ...article, isLoading: false });
    });
  }

  render() {
    const { title, body, isLoading } = this.state;
    const { article_id, currUser } = this.props;
    if (isLoading) return <Loader />;
    return (
      <div className="article">
        <h2>{title}</h2>
        <p className="articleBody">{body}</p>
        <br />
        <Comments article_id={article_id} currUser={currUser} />
      </div>
    );
  }
}

export default Article;
