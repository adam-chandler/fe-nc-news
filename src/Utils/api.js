import axios from "axios";

const request = axios.create({
  baseURL: "https://adams-be-nc-news.herokuapp.com/api",
});

export const getTopics = () => {
  return request.get("/topics").then(({ data }) => {
    return data;
  });
};

export const getArticles = (topic, sort_by, order) => {
  return request
    .get("/articles", { params: { topic, sort_by, order } })
    .then(({ data }) => {
      return data;
    });
};

export const getArticle = (article_id) => {
  return request.get(`/articles/${article_id}`).then(({ data }) => {
    return data;
  });
};

export const getArticleComments = (article_id, sort_by, order_by) => {
  return request
    .get(`/articles/${article_id}/comments`, {
      params: { sort_by, order_by },
    })
    .then(({ data }) => {
      return data;
    });
};

export const patchVote = (id, vote, type) => {
  return request
    .patch(`/${type}/${id}`, { inc_votes: vote })
    .then(({ data }) => {
      return data;
    });
};

export const postComment = (article_id, body, username) => {
  return request.post(`/articles/${article_id}/comments`, { username, body });
};

export const deleteComment = (comment_id) => {
  return request.delete(`/comments/${comment_id}`);
};

export const getUser = (username) => {
  return request.get(`/users/${username}`).then(({ data }) => {
    return data;
  });
};
