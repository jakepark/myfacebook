myfacebook.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  toJSON: function () {
    var json = { user: _.clone(this.attributes)};
    return json;
  },

  saveFormData: function(formData, options){
    var method = this.isNew() ? "POST" : "PUT";
    var model = this;

    $.ajax({
      url: _.result(model, "url"),
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function(resp){
        model.set(model.parse(resp));
        model.trigger('sync', model, resp, options);
        options.success && options.success(model, resp, options);
      },
      error: function(resp){
        options.error && options.error(model, resp, options);
      }
    });
  },

  friends: function () {
    if (!this._friends) {
      this._friends = new myfacebook.Collections.Friendships([], { user: this });
    }

    return this._friends;
  },

  parse: function (response) {
    if (response.friends) {
      this.friends().set(response.friends, { parse: true });
      delete response.friends;
    }

    return response;
  }


});
