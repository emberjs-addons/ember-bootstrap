/*globals EmberDev ENV QUnit */

(function() {
  window.Ember = window.Ember || {};

  Ember.config = {};
  Ember.testing = true;

  window.ENV = { TESTING: true };

  var extendPrototypes = QUnit.urlParams.extendprototypes;
  ENV['EXTEND_PROTOTYPES'] = !!extendPrototypes;

  if (EmberDev.jsHint) {
    // jsHint makes its own Object.create stub, we don't want to use this
    ENV['STUB_OBJECT_CREATE'] = !Object.create;
  }

  window.async = function(callback, timeout) {
    stop();

    timeout = setTimeout(function() {
      start();
      ok(false, "Timeout was reached");
    }, timeout || 100);

    return function() {
      clearTimeout(timeout);

      start();

      var args = arguments;
      Ember.run(function() {
        callback.apply(this, args);
      });
    };
  };

  window.invokeAsync = function(callback, timeout) {
    timeout = timeout || 1;

    setTimeout(async(callback, timeout+100), timeout);
  };

  var syncForTest = function(fn) {
    var callSuper;

    if (typeof fn !== "function") { callSuper = true; }

    return function() {
      var override = false, ret;

      if (Ember.run && !Ember.run.currentRunLoop) {
        Ember.run.begin();
        override = true;
      }

      try {
        if (callSuper) {
          ret = this._super.apply(this, arguments);
        } else {
          ret = fn.apply(this, arguments);
        }
      } finally {
        if (override) {
          Ember.run.end();
        }
      }

      return ret;
    };
  };

  Ember.config.overrideAccessors = function() {
    Ember.set = syncForTest(Ember.set);
    Ember.get = syncForTest(Ember.get);
  };

  Ember.config.overrideClassMixin = function(ClassMixin) {
    ClassMixin.reopen({
      create: syncForTest()
    });
  };

  Ember.config.overridePrototypeMixin = function(PrototypeMixin) {
    PrototypeMixin.reopen({
      destroy: syncForTest()
    });
  };


  minispade.register('ember-bootstrap/~test-setup', function() {
    run = Ember.run;

    Ember.View.reopen({
      _insertElementLater: syncForTest()
    });

    window.clickRelLink = function(view, relName) {
      var selector = 'a[rel=' + relName + ']',
      element = view.$().find(selector);
      ok(element);
      element.click();
      return element;
    };

    window.appendIntoDOM = function(view) {
      Ember.run(function() {
        view.append() ;
      });
    };

    window.isAppendedToDOM = function(view) {
      return view.$() && view.$().length > 0;
    };

    window.isDestroyed = function(object) {
      return object.get('isDestroyed');
    };

    window.documentHasSelector = function(selector) {
      return jQuery(selector).length > 0;
    };

    window.destroyIfNecessary = function(object) {
      if (object && !object.get('isDestroyed')) {
        Ember.run(function() {
          object.destroy();
        });
      }
    };

  });

  EmberDev.distros = {
    spade:   'ember-spade.js',
    build:   'ember-bootstrap.js'
  };

})();
