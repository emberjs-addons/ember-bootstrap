require("ember-bootstrap/mixins/text_support");
require("ember-bootstrap/mixins/add_classes_support");

var Bootstrap = window.Bootstrap;
Bootstrap.Forms.TextField = Bootstrap.Forms.Field.extend({
  type: 'text',

  inputField: Ember.TextField.extend(Bootstrap.TextSupport, Bootstrap.AddClassesSupport, {
    typeBinding: 'parentView.type',
    sizeBinding: 'parentView.size',
  })
});
