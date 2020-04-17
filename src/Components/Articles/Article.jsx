import React from "react";
import * as api from "../../Utils/api";
import Comments from "./Comments";
import Loader from "../Loader";
import ErrorDisplay from "../ErrorDisplay";

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
    isError: false,
    msg: "",
    status: "",
  };

  componentDidMount() {
    api
      .getArticle(this.props.article_id)
      .then(({ article }) => {
        this.setState({ ...article, isLoading: false });
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
    const { title, body, isLoading, isError, status, msg } = this.state;
    const { article_id, currUser } = this.props;

    if (isLoading) return <Loader />;
    if (isError) return <ErrorDisplay status={status} msg={msg} />;
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
