require("ember-bootstrap/mixins/text_support");

var Bootstrap = window.Bootstrap;
Bootstrap.Forms.PasswordField = Bootstrap.Forms.Field.extend({
  type: 'password',

  inputField: Ember.TextField.extend(Bootstrap.TextSupport, {
    typeBinding: 'parentView.type',
    sizeBinding: 'parentView.size'
  })
});
