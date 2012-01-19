Ember.PillItem = SC.View.extend({
  template: SC.Handlebars.compile('<a href="#" {{bindAttr rel="title"}}>{{title}}</a>'),
  title: null
});
