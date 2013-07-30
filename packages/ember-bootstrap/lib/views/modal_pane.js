var get = Ember.get;

var modalPaneTemplate = [
'<div class="modal-header">',
'  <a href="#" class="close" rel="close">&times;</a>',
'  {{view view.headerViewClass}}',
'</div>',
'<div class="modal-body">{{view view.bodyViewClass}}</div>',
'<div class="modal-footer">',
'  {{view view.footerViewClass}}',
'</div>'].join("\n");

var footerTemplate = [
'{{#if view.parentView.secondary}}<a href="#" class="btn btn-secondary" rel="secondary">{{view.parentView.secondary}}</a>{{/if}}',
'{{#if view.parentView.primary}}<a href="#" class="btn btn-primary" rel="primary">{{view.parentView.primary}}</a>{{/if}}'].join("\n");

var modalPaneBackdrop = '<div class="modal-backdrop"></div>';

Bootstrap.ModalPane = Ember.View.extend(Ember.DeferredMixin, {
  classNames: 'modal',
  defaultTemplate: Ember.Handlebars.compile(modalPaneTemplate),
  heading: null,
  message: null,
  primary: null,
  secondary: null,
  animateBackdropIn: null,
  animateBackdropOut: null,
  showBackdrop: true,
  headerViewClass: Ember.View.extend({
    tagName: 'h3',
    template: Ember.Handlebars.compile('{{view.parentView.heading}}')
  }),
  bodyViewClass: Ember.View.extend({
    tagName: 'p',
    template: Ember.Handlebars.compile('{{{view.parentView.message}}}')
  }),
  footerViewClass: Ember.View.extend({
    template: Ember.Handlebars.compile(footerTemplate)
  }),

  didInsertElement: function() {
    if (get(this, 'showBackdrop')) this._appendBackdrop();
    this._setupDocumentKeyHandler();
  },

  willDestroyElement: function() {
    if (this._backdrop) this._removeBackdrop();
    this._removeDocumentKeyHandler();
  },

  keyPress: function(event) {
    if (event.keyCode === 27) {
      this._triggerCallbackAndDestroy({ close: true }, event);
    }
  },

  click: function(event) {
    var target = event.target,
        targetRel = target.getAttribute('rel');

    if (targetRel) {
      var options = {};
      options[targetRel] = true;

      this._triggerCallbackAndDestroy(options, event);
      return false;
    }
  },

  _appendBackdrop: function() {
    var parentLayer = this.$().parent(),
        animateIn = this.get("animateBackdropIn");
    this._backdrop = jQuery(modalPaneBackdrop).appendTo(parentLayer);
    if (animateIn) this._backdrop.addClass("hide")[animateIn.method](animateIn.options);
  },

  _removeBackdrop: function() {
    var animateOut = this.get("animateBackdropOut"),
        _this = this;

    if (animateOut) {
      animateOut.options = jQuery.extend({always: function(){ _this._backdrop.remove()}}, animateOut.options);
      this._backdrop[animateOut.method](animateOut.options)
    } else {
      this._backdrop.remove();
    }
  },

  _setupDocumentKeyHandler: function() {
    var cc = this,
        handler = function(event) {
          cc.keyPress(event);
        };
    jQuery(window.document).bind('keyup', handler);
    this._keyUpHandler = handler;
  },

  _removeDocumentKeyHandler: function() {
    jQuery(window.document).unbind('keyup', this._keyUpHandler);
  },

  _resolveOrReject: function(options, event) {
    if (options.primary) this.resolve(options, event);
    else this.reject(options, event);
  },

  _triggerCallbackAndDestroy: function(options, event) {
    var destroy;
    if (this.callback) {
      destroy = this.callback(options, event);
    }
    if (destroy === undefined || destroy) {
      this._resolveOrReject(options, event);
      this.destroy();
    }
  }
});

Bootstrap.ModalPane.reopenClass({
  rootElement: ".ember-application",
  popup: function(options) {
    var modalPane, rootElement;
    if (!options) options = {};
    modalPane = this.create(options);
    rootElement = get(this, 'rootElement');
    modalPane.appendTo(rootElement);
    return modalPane;
  }
});

