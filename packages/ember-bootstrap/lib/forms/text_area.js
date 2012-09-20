require("ember-bootstrap/mixins/text_support");

var Bootstrap = window.Bootstrap;
Bootstrap.Forms.TextArea = Bootstrap.Forms.Field.extend({

  inputField: Ember.TextArea.extend(Bootstrap.TextSupport, {
    rowsBinding: 'parentView.rows',
    colsBinding: 'parentView.cols' 
  })
});
