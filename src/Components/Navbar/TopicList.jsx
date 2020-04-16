import React from "react";
import { Link } from "@reach/router";

class TopicList extends React.Component {
  render() {
    const { topics } = this.props;

    return (
      <div className="topicdropdown">
        <div className="topiclist">
          {topics.map((topic) => {
            return (
              <Link to={`/topics/${topic.slug}`} key={topic.slug}>
                <div className="topicLink">{topic.slug}</div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TopicList;
