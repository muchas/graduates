App.Command.Posts = App.Command.Base.extend({

    commands: {
        "posts/list": "listPosts",
        "posts/comments": "listComments",
        "posts/newPost": "addPost",
        "posts/editPost": "editPost",
        "posts/removePost": "removePost",
        "posts/newComment": "addComment",
        "posts/editComment": "editComment",
        "posts/removeComment": "removeComment",
        "posts/likePost": "likePost",
        "posts/likeComment": "likeComment"
    },

    listPosts: function(callback) {
      this.jsonRequest("GET", "post-list", {}, {}, callback);
    },

    listComments: function(id, callback) {
      this.jsonRequest("GET", "comment-list", {pk: id}, {}, callback);
    },

    addPost: function(data, callback, failure) {
        this.jsonRequest("POST", "post-list", {}, data, callback, failure);
    },

    editPost: function(id, data, callback, failure) {
        this.jsonRequest("PUT", "post-detail", {pk: id}, data, callback, failure);
    },

    removePost: function(id, callback) {
        this.jsonRequest("DELETE", "post-detail", {pk: id}, {}, callback);
    },

    addComment: function(id, data, callback, failure) {
        this.jsonRequest("POST", "comment-list", {pk: id}, data, callback, failure);
    },

    editComment: function(id, data, callback, failure) {
        this.jsonRequest("PUT", "comment", {pk: id}, data, callback, failure);
    },

    removeComment: function(id, callback) {
        this.jsonRequest("DELETE", "comment", {pk: id}, {}, callback);
    },

    likePost: function(id, callback) {},

    likeComment: function(id, callback) {}
});