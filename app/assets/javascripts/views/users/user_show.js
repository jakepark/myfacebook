myfacebook.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],


  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  events: {
    "submit form .avatar": "newAvatar",
    "change #input-post-image": "fileInputChange"
  },

  render: function () {

    var view = this.template({ user: this.model })
    this.$el.html(view);
    return this;
  },

  newAvatar: function () {
    debugger
  },

});
