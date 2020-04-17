import React from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../../Utils/api";
import SortByBar from "../Navbar/SortByBar";
import Loader from "../Loader";
import ErrorDisplay from "../ErrorDisplay";

class ArticlesList extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: "",
    order: "",
    isError: false,
    status: "",
    msg: "",
  };

  componentDidMount() {
    this.fetchArticles(this.props.topic_slug);
  }

  componentDidUpdate(prevProp, prevState) {
    const { topic_slug } = this.props;
    const { sortBy, order } = this.state;
    if (
      prevProp.topic_slug !== topic_slug ||
      prevState.sortBy !== sortBy ||
      prevState.order !== order
    ) {
      this.fetchArticles(this.props.topic_slug, sortBy, order);
    }
  }

  render() {
    const { articles, isLoading, isError, status, msg } = this.state;

    if (isLoading) return <Loader />;
    if (isError) return <ErrorDisplay status={status} msg={msg} />;
    return (
      <div className="articles">
        {this.props.topic_slug ? <h3>{this.props.topic_slug}</h3> : null}
        <SortByBar listName="articles" handleSortClick={this.handleSortClick} />
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </div>
    );
  }

  fetchArticles = (topic_slug, sortBy, order) => {
    api
      .getArticles(topic_slug, sortBy, order)
      .then(({ articles }) => this.setState({ articles, isLoading: false }))
      .catch((err) => {
        const { data, status } = err.response;
        this.setState({
          isError: true,
          isLoading: false,
          msg: data.msg,
          status,
        });
      });
  };

  handleSortClick = (sortBy) => {
    let newOrder =
      this.state.order === "desc" && this.state.sortBy === sortBy
        ? "asc"
        : "desc";
    this.setState({ sortBy, order: newOrder, isLoading: true });
  };
}

export default ArticlesList;
