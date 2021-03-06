myfacebook.Views.UserForm = Backbone.View.extend({

  initialize: function(options){

    this.listenTo(this.model, "sync change", this.render);
    this.callback = options.callback;
    this.listenTo(myfacebook.currentUser, "signIn", this.signInCallback);
  },

  template: JST['users/edit'],

  events: {
    "submit form": "submit",
    "click .delete_unhide": "confirmDelete",
    "click #deleteUser": "deleteUser",

  },

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);

    return this;
  },

  submit: function(event){
    event.preventDefault();

    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    
    var that = this;

    var model = this.collection.getOrFetch(this.model.id)

    model.set(userData);

    model.save({}, {
      success: function(){
        myfacebook.currentUser.fetch();
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("", { trigger: true })
      },
      error: function(data){
        alert("Form invalid. Let the user know what went wrong.");
        console.log(data);
      }
    });
  },

  confirmDelete: function (e){
    e.preventDefault();
    var $target = $(e.currentTarget);
    $target.addClass('hidden')

    var $body = $(document.getElementsByClassName('content-signup-edit'))
    $body.addClass('hidden')

    var $hidden = $(document.getElementById('delete_modal'))
    $hidden.removeClass('hidden')


  },

  deleteUser: function (event) {
    event.preventDefault();
    var user = this.collection.getOrFetch(this.model.id);

    myfacebook.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("/session/new", { trigger: true });
      }
    });
    user.destroy()

  },



  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }
});


// //this re-renders index page on sign in
//
// event.preventDefault();
//
// var $form = $(event.currentTarget);
// var userData = $form.serializeJSON().user;
// var that = this;
//
// var model = new myfacebook.Models.User()
//
// model.set(userData);
//
// model.save({}, {
