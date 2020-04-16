import React from "react";
import CommentCard from "./CommentCard";
import SortByBar from "../Navbar/SortByBar";
import * as api from "../../Utils/api";
import Loader from "../Loader";
import CommentForm from "./CommentForm";

class Comments extends React.Component {
  state = { comments: [], isLoading: true, sortBy: "", order: "" };

  componentDidMount() {
    api.getArticleComments(this.props.article_id).then(({ comments }) => {
      this.setState({ comments, isLoading: false });
    });
  }

  componentDidUpdate(prevProp, prevState) {
    const { sortBy, order } = this.state;
    if (prevState.sortBy !== sortBy || prevState.order !== order) {
      api
        .getArticleComments(this.props.article_id, sortBy, order)
        .then(({ comments }) => {
          this.setState({ comments, isLoading: false });
        });
    }
  }

  render() {
    const { comments, isLoading } = this.state;
    const { currUser, article_id } = this.props;

    if (isLoading) return <Loader />;
    return (
      <>
        <CommentForm
          article_id={article_id}
          currUser={currUser}
          handleNewComment={this.handleNewComment}
        />
        <SortByBar listName="comments" handleSortClick={this.handleSortClick} />
        {comments.map((comment) => {
          return (
            <CommentCard
              {...comment}
              key={comment.comment_id}
              currUser={currUser}
              handleDeleteComment={this.handleDeleteComment}
            />
          );
        })}
      </>
    );
  }

  handleNewComment = () => {
    api.getArticleComments(this.props.article_id).then(({ comments }) => {
      this.setState({ comments });
    });
  };

  handleDeleteComment = (comment_id) => {
    this.setState({ isLoading: true });
    api.deleteComment(comment_id).then(() => {
      api.getArticleComments(this.props.article_id).then(({ comments }) => {
        this.setState({ comments, isLoading: false });
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

export default Comments;
