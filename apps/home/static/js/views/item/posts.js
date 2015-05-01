App.ItemView.Post = Marionette.ItemView.extend({
    template: Handlebars.templates.post,
    events: {
        'click .edit': 'edit',
        'click .remove': 'removePost',
        'click .comments': 'showComments'
    },

    initialize: function() {
      this.commentsFetched = false;
      this.isEditing = false;
      this.contentEl = '.feed-content';
    },

    edit: function() {
        if(!this.isEditing) {
            var form = new App.Form.EditPost({ model: this.model });
            form.parent = this;
            var $content = this.$el.find(this.contentEl);
            $content.html(form.render().$el);
            this.isEditing = true;
        }
    },

    removePost: function(event) {
        App.instance.execute("posts/removePost", this.model.get('id'), function() {
            this.$el.fadeOut(300, function() {
                this.remove();
            }.bind(this));
        }.bind(this));
    },

    renderContent: function() {
          var $content = this.$el.find(this.contentEl);
          $content.html(this.model.get('content'));
          this.isEditing = false;
    },

    showComments: function() {
        if(!this.commentsFetched) {
            this.commentsFetched = true;
            var $comments = this.$el.find('comments-container');
            App.instance.execute("posts/comments", this.model.get('id'), function(response) {
                var comments = new App.Collection.Comments(response);
                var commentsView = new App.CollectionView.Comments({ collection: comments });
                $comments.html(commentsView.render().$el);
            });
        }
    }
});

App.ItemView.Comment = Marionette.ItemView.extend({
   template: Handlebars.templates.comment
});