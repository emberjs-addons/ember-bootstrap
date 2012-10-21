require("ember-bootstrap/mixins/text_support");
require("ember-bootstrap/mixins/add_classes_support");

var Bootstrap = window.Bootstrap;
Bootstrap.Forms.TextArea = Bootstrap.Forms.Field.extend({

  inputField: Ember.TextArea.extend(Bootstrap.TextSupport, Bootstrap.AddClassesSupport, {
    rowsBinding: 'parentView.rows',
    colsBinding: 'parentView.cols',
  })
});
