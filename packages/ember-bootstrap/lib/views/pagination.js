require("ember-bootstrap/mixins/item_selection_support");
require("ember-bootstrap/mixins/item_view_title_support");
require("ember-bootstrap/mixins/item_view_href_support");

var get = Ember.get, set = Ember.set, A = Ember.A;

Bootstrap.Pagination = Ember.View.extend({
	childViews: ["contentView"],
	classNames: "pagination",
	template: Ember.Handlebars.compile('{{view contentView}}'),
	init: function() {
		this._super();
		if (!this.get("content")) {
			this.set("content", A([]));
		}
	},
	contentView: Ember.CollectionView.extend({
		tagName: "ul",
		contentBinding: "parentView.content",
		selectionBinding: "parentView.selection",
		itemTitleKeyBinding: "parentView.title",
		itemHrefKeyBinding: "parentView.href",
		itemViewClass: Ember.View.extend(Bootstrap.ItemSelectionSupport, Bootstrap.ItemViewTitleSupport, Bootstrap.ItemViewHrefSupport, {
			classNameBindings: ["content.disabled"],
			template: Ember.Handlebars.compile('<a {{bindAttr href="href"}}>{{title}}</a>')
		})
	})
});
