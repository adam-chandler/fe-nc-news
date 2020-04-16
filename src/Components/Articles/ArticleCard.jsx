import React from "react";
import { Link } from "@reach/router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Voter from "./Voter";
dayjs.extend(relativeTime);

const ArticleCard = ({ article }) => {
  const {
    author,
    title,
    body,
    article_id,
    topic,
    created_at,
    votes,
    comment_count,
  } = article;

  return (
    <div className="articlecard">
      <div className="articleCardVote">
        <Voter votes={votes} id={article_id} type="articles" />
      </div>
      <div className="articleCardComments">
        <p>{comment_count}</p>
        <div>
          <Link to={`/article/${article_id}`}>
            <ion-icon name="chatbubbles" />
          </Link>
        </div>
      </div>
      <div className="articleCardHeader">
        <p className="articleCardTopic">
          {" "}
          <Link to={`/topics/${topic}`}>{topic}</Link>{" "}
        </p>
        <p title={`${dayjs(created_at)}`} className="articleCardDate">
          Posted by {author}, {`${dayjs(created_at).fromNow()}`}
        </p>
      </div>

      <h2 className="articleCardTitle">
        <Link to={`/article/${article_id}`}>{title}</Link>
      </h2>
      <div className="articleCardBody">
        <Link to={`/article/${article_id}`}>{body.slice(0, 100)}...</Link>
      </div>
      <div className="articleCardFooter"></div>
    </div>
  );
};

export default ArticleCard;
