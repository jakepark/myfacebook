myfacebook.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],


  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  events: {
    "click .add_friend": "createFriendship",
    "submit form": "newAvatar",
    "change #input-user-avatar": "fileInputChange"
  },

  render: function () {

    var view = this.template({ user: this.model })
    this.$el.html(view);
    return this;
  },

  createFriendship: function (e) {
    e.preventDefault();

    var view = this;
    var target = this.model
    var target_id = target.get('id')
    var friendship = new myfacebook.Models.Friendship()
    friendship.set({
      user_id: myfacebook.current_user.id,
      friend_id: target_id
    })
    debugger
    friendship.save({

      }, {
      success: function () {
        Backbone.history.navigate('/users/' + target_id, {trigger: true});
        view.reset();
      }
    });
    return false;
  },

  newAvatar: function(event){
    event.preventDefault();

    this.model.collection = this.collection;  //instead of initialized
    var file = this.$("#input-user-avatar")[0].files[0];
    var formData = new FormData();

    formData.append("user[avatar]", file);
    var that = this;

    this.model.saveFormData(formData, {
      success: function(){
        that.collection.add(that.model);
        Backbone.history.navigate("", { trigger: true });
      }
    });
  },

  fileInputChange: function(event){
    console.log(event.currentTarget.files[0]);

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-post-image").attr("src", src);
  }


});
