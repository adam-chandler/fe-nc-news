import React from "react";
import * as api from "../../Utils/api";

class CommentForm extends React.Component {
  state = {
    body: "",
    submitComment: "",
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { body, submitComment } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className="commentForm">
          <textarea
            className="commentTextbox"
            onChange={this.handleChange}
            value={body}
            name="body"
            placeholder=" Add a comment"
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
    if (body.length < 5) {
      this.setState({
        submitComment: "Comments must be over 5 characters long",
      });
    } else {
      this.setState({ body: "", submitComment: "Comment posted!" });
      api
        .postComment(article_id, body, currUser)
        .then(({ data }) => {
          this.props.handleNewComment(data.comment);
          this.timer = setTimeout(
            () => this.setState({ submitComment: "" }),
            2000
          );
        })
        .catch((err) => {
          console.dir(err);
          this.setState({
            submitComment: "Error: comment failed to post",
          });
        });
    }
  };
}

export default CommentForm;
