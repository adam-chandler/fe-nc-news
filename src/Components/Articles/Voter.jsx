import React from "react";
import * as api from "../../Utils/api";

class Voter extends React.Component {
  state = {
    optimisticVotes: 0,
    isError: false,
  };

  render() {
    const { optimisticVotes, isError } = this.state;
    const { votes, id, type } = this.props;
    if (isError) return <p>Error: Vote failed</p>;
    return (
      <>
        <button
          onClick={() => this.handleVoteClick(id, 1, type)}
          disabled={optimisticVotes > 0}
        >
          <ion-icon
            name={type === "articles" ? "caret-up" : "arrow-up-circle"}
          />
        </button>
        <p
          className={
            optimisticVotes === 1
              ? "greenVote"
              : optimisticVotes === -1
              ? "redVote"
              : null
          }
        >
          {votes + optimisticVotes}
        </p>
        <button
          onClick={() => this.handleVoteClick(id, -1, type)}
          disabled={optimisticVotes < 0}
        >
          <ion-icon
            name={type === "articles" ? "caret-down" : "arrow-down-circle"}
          />
        </button>
      </>
    );
  }

  handleVoteClick = (id, vote, type) => {
    this.setState((currState) => {
      return {
        optimisticVotes: currState.optimisticVotes + vote,
      };
    });
    api.patchVote(id, vote, type).catch((err) => {
      const { data, status } = err.response;
      this.setState({
        isError: true,
        msg: data.msg,
        status,
      });
    });
  };
}

export default Voter;
