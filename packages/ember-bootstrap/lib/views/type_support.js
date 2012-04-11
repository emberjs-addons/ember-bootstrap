var get = Ember.get, getPath = Ember.getPath, set = Ember.set;

Bootstrap.TypeSupport = Ember.Mixin.create({
  template: Ember.Handlebars.compile('{{content}}'),
  tagName: 'span',
  typeName: null,
  classNameBindings: 'typeClass',
  type: null // 'success', 'warning', 'error', 'info' || 'inverse'
  init: function() {
    this.classNames.push(this.typeName);
  },
  typeClass: Ember.computed(function() {
    var type = get(this, 'type'),
        typeName = get(this, 'typeName');
    return type ? typeName + '-' + type : null;
  }).property('type').cacheable()
});
