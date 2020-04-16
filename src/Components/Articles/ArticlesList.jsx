import React from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../../Utils/api";
import SortByBar from "../Navbar/SortByBar";
import Loader from "../Loader";

class ArticlesList extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: "",
    order: "",
  };

  componentDidMount() {
    api
      .getArticles(this.props.topic_slug)
      .then(({ articles }) => this.setState({ articles, isLoading: false }));
  }

  componentDidUpdate(prevProp, prevState) {
    const { topic_slug } = this.props;
    const { sortBy, order } = this.state;
    if (
      prevProp.topic_slug !== topic_slug ||
      prevState.sortBy !== sortBy ||
      prevState.order !== order
    ) {
      api
        .getArticles(this.props.topic_slug, sortBy, order)
        .then(({ articles }) => this.setState({ articles, isLoading: false }));
    }
  }

  render() {
    const { articles, isLoading } = this.state;

    if (isLoading) return <Loader />;
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

  handleSortClick = (sortBy) => {
    let newOrder =
      this.state.order === "desc" && this.state.sortBy === sortBy
        ? "asc"
        : "desc";
    this.setState({ sortBy, order: newOrder, isLoading: true });
  };
}

export default ArticlesList;
