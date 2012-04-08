require("ember-bootstrap/views/item_selection_support");
require("ember-bootstrap/views/button_group");

Bootstrap.RadioButtonGroup = Bootstrap.ButtonGroup.extend({
  selection: null,

  itemViewClass: Em.View.extend(Bootstrap.ItemSelectionSupport, {
    classNames: 'btn',
    tagName: 'a',
    template: Ember.Handlebars.compile('{{content}}')
  })
});

