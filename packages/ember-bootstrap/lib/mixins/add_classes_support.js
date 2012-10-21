var get, set;

get = Em.get;

set = Em.set;

Bootstrap.AddClassesSupport = Ember.Mixin.create({
  init: function() {
    var classNames, classNamesToAdd;
    this._super();
    classNamesToAdd = get(this, "parentView.classNamesToAdd");
    if (classNamesToAdd) {
      classNames = get(this, "classNames");
      classNames.addObjects(Em.makeArray(classNamesToAdd));
      return set(this, "classNames", classNames);
    }
  }
});