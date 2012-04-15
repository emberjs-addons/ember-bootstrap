var get = Ember.get;

Bootstrap.Breadcrumb = Ember.CollectionView.extend({
	tagName: 'ul',
	classNames: 'breadcrumb',
	divider: '/',
	itemViewClass: Ember.View.extend({
		template: Ember.Handlebars.compile('<a {{bindAttr href="content.href"}}>{{content.title}}</a><span class="divider">{{parentView.divider}}</span>')
	}),
	lastItemViewClass: Ember.View.extend({
		classNames: 'active',
		template: Ember.Handlebars.compile('{{content.title}}')
	}),
	createChildView: function(view, attrs) {
		if (attrs && attrs.content === get(get(this, 'content'), 'lastObject')) {
			view = get(this, 'lastItemViewClass');
		}
		return this._super(view, attrs);
	}
});