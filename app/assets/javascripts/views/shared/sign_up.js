myfacebook.Views.SignUp = Backbone.View.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(myfacebook.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit form": "submit"
  },

  template: JST['shared/sign_in'],

  render: function(){
    this.$el.html(this.template());

    return this;
  },

  submit: function(event){

    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    myfacebook.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }

});
