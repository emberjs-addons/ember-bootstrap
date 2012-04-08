require("ember-bootstrap/views/item_selection_support");
require("ember-bootstrap/views/button_group");

var get = Ember.get, set = Ember.set;

Bootstrap.RadioButtonGroup = Bootstrap.ButtonGroup.extend({
  selection: null,
  allowsEmptySelection: false,

  init: function() {
    this._super();
    var content = get(this, 'content');
    if (content && get(this, 'allowsEmptySelection') === false) {
      set(this, 'selection', content.get('firstObject'));
    }
  },

  itemViewClass: Em.View.extend(Bootstrap.ItemSelectionSupport, {
    classNames: 'btn',
    tagName: 'a',
    template: Ember.Handlebars.compile('{{content}}')
  })
});

