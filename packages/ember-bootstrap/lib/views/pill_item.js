<<<<<<< HEAD
require("ember-bootstrap/mixins/item_selection_support");
=======
require("ember-bootstrap/views/item_selection_support");
>>>>>>> jzajpt/master

Bootstrap.PillItem = Ember.View.extend(Bootstrap.ItemSelectionSupport, {
  template: Ember.Handlebars.compile('<a href="#">{{title}}</a>')
});
