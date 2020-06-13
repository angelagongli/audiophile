import axios from "axios";

export default {
  getTracks: function(id) {
    return axios.get("/api/tracks/" + id);
  },
  updateTrack: function(id, trackData) {
    return axios.put("/api/tracks/" + id, trackData);
  },
  deleteTrack: function(id) {
    return axios.delete("/api/tracks/" + id);
  },
  saveTrack: function(trackData) {
    return axios.post("/api/tracks", trackData);
  },
  search: function(searchTerm) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBi-2ll4v7K5TlZauKCfxNaV12s6e-cNPo&q=${searchTerm}&maxResults=20&type=video`);
  },

  getComments: function(id) {
    return axios.get("/api/comments/" + id);
  },
  updateComment: function(id, commentData) {
    return axios.put("/api/comments/" + id, commentData);
  },
  deleteComment: function(id) {
    return axios.delete("/api/comments/" + id);
  },
  saveComment: function(commentData) {
    return axios.post("/api/comments", commentData);
  },

  getConversation: function(id) {
    return axios.get("/api/conversations/" + id);
  },
  getUserConversations: function(id) {
    return axios.get("/api/conversations/user/" + id);
  },
  deleteConversation: function(id) {
    return axios.delete("/api/conversations/" + id);
  },
  makeConversation: function(trackData) {
    return axios.post("/api/conversations", trackData);
  },

  login: function(userData) {
    return axios.post("/api/login", userData);
  },
  signup: function(userData) {
    return axios.post("/api/signup", userData);
  },
  getUserData: function() {
    return axios.get("/api/user_data");
  },
  getAllUsers: function() {
    return axios.get("/api/users");
  },
  logout: function() {
    return axios.get("/logout");
  }
};
