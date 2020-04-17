import React from "react";
import * as api from "../../Utils/api";

class CommentForm extends React.Component {
  state = {
    body: "",
    submitComment: "",
  };

  render() {
    const { body, submitComment } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className="commentForm">
          <input
            type="text"
            className="commentTextbox"
            onChange={this.handleChange}
            value={body}
            name="body"
            placeholder=" Add a comment"
            minLength="3"
          />
          <button type="submit" className="articleSubmit">
            Submit
          </button>
        </form>
        <p className="submitComment">{submitComment}</p>
      </>
    );
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { body } = this.state;
    const { article_id, currUser } = this.props;
    this.setState({ body: "", submitComment: "Comment posted!" });
    api
      .postComment(article_id, body, currUser)
      .then(({ data }) => {
        this.props.handleNewComment(data.comment);
      })
      .catch((err) => {
        this.setState({
          submitComment: "Error: comment failed to post",
        });
      });
  };
}

export default CommentForm;
