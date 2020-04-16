import React from "react";
import dayjs from "dayjs";
import Voter from "./Voter";

const CommentCard = ({
  author,
  votes,
  created_at,
  body,
  comment_id,
  currUser,
  handleDeleteComment,
}) => {
  return (
    <div className="commentCard">
      <div className="commentHeader">
        <p>
          <b>{author}</b>
          <span title={`${dayjs(created_at)}`}>{` - ${dayjs(
            created_at
          ).fromNow()}`}</span>
        </p>
      </div>
      <div className="commentBody">
        <p>{body}</p>
      </div>
      <div className="commentVotes">
        <Voter votes={votes} id={comment_id} type="comments" />
        {currUser === author ? (
          <p
            onClick={() => handleDeleteComment(comment_id)}
            className="deleteComButton"
          >
            Delete comment
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default CommentCard;
