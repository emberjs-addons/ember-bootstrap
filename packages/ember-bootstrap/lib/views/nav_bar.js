var navBarTemplate = [
'<div class="navbar-inner">',
'{{#if view.title}}<a class="brand" href="#">{{view.title}}</a>{{/if}}',
'{{ view view.navBarListView contentBinding=view.content }}',
'</div>'].join("\n");

Bootstrap.NavBar = Ember.View.extend({
  tagName: 'div',
  classNames: ['nav', 'navbar'],
  title: null,
  content: [],
  selection: null,
  defaultTemplate: Ember.Handlebars.compile(navBarTemplate),
  navBarListView: Bootstrap.NavList.extend({
    classNames: ['nav'],
    attributeBindings: ['itemTitleKey', 'itemHrefKey', 'selectionBinding'],
    itemTitleKeyBinding: "parentView.itemTitleKey",
    itemHrefKeyBinding: "parentView.itemHrefKey",
    selectionBinding: "parentView.selection"
  })
});
