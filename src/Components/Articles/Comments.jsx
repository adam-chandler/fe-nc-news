import React from "react";
import CommentCard from "./CommentCard";
import SortByBar from "../Navbar/SortByBar";
import * as api from "../../Utils/api";
import Loader from "../Loader";
import CommentForm from "./CommentForm";
import ErrorDisplay from "../ErrorDisplay";

class Comments extends React.Component {
  state = {
    comments: [],
    isLoading: true,
    sortBy: "",
    order: "",
    isError: false,
    msg: "",
    status: "",
  };

  componentDidMount() {
    this.fetchComments(this.props.article_id);
  }

  componentDidUpdate(prevProp, prevState) {
    const { sortBy, order } = this.state;
    if (prevState.sortBy !== sortBy || prevState.order !== order) {
      this.fetchComments(this.props.article_id, sortBy, order);
    }
  }

  fetchComments = (article_id, sortBy, order) => {
    api
      .getArticleComments(article_id, sortBy, order)
      .then(({ comments }) => {
        this.setState({ comments, isLoading: false });
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
  };

  render() {
    const { comments, isLoading, isError, status } = this.state;
    const { currUser, article_id } = this.props;

    if (isLoading) return <Loader />;
    if (isError)
      return (
        <ErrorDisplay
          msg="Failed to retrieve comments for this article"
          status={status}
        />
      );
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

  handleNewComment = (comment) => {
    const { comments } = this.state;
    const newComments = [comment, ...comments];
    this.setState({ comments: newComments });
  };

  handleDeleteComment = (comment_id) => {
    const { comments } = this.state;
    this.setState({ isLoading: true });
    api
      .deleteComment(comment_id)
      .then(() => {
        const newComments = comments.filter(
          (comment) => comment.comment_id !== comment_id
        );
        this.setState({ comments: newComments, isLoading: false });
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
