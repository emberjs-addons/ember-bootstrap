var get, set;

get = Ember.get;

set = Ember.set;

Bootstrap.AddClassesSupport = Ember.Mixin.create({
  init: function() {
    var classNames, classNamesToAdd;
    this._super();
    classNamesToAdd = get(this, "parentView.classNamesToAdd");
    if (classNamesToAdd) {
      classNames = get(this, "classNames");
      classNames.addObjects(Ember.makeArray(classNamesToAdd));
      return set(this, "classNames", classNames);
    }
  }
});