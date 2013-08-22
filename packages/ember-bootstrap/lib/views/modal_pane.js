var get = Ember.get;

var modalPaneTemplate = [
    '<div class="modal-dialog">',
    '  <div class="modal-content">',
    '    <div class="modal-header">',
    '      {{#if view.showCloseButton}}<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>{{/if}}',
    '      {{view view.headerViewClass}}',
    '    </div>',
    '    <div class="modal-body">{{view view.bodyViewClass}}</div>',
    '    <div class="modal-footer">',
    '      {{view view.footerViewClass}}',
    '    </div>',
    '  </div>',
    '</div>' ].join("\n");

var footerTemplate = [
    '{{#if view.parentView.secondary}}<button type="button" class="btn btn-default" rel="secondary">{{view.parentView.secondary}}</button>{{/if}}',
    '{{#if view.parentView.primary}}<button type="button" class="btn btn-primary" rel="primary">{{view.parentView.primary}}</button>{{/if}}' ]
    .join("\n");

Bootstrap.ModalPane = Ember.View.extend(Ember.DeferredMixin, {
  classNames: 'modal',
  classNameBindings : 'fade',
  defaultTemplate: Ember.Handlebars.compile(modalPaneTemplate),
  heading: null,
  message: null,
  primary: null,
  secondary: null,
  fade: false,
  showBackdrop: true,
  showCloseButton: true,
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
    this.$().modal({
      backdrop: get(this, 'showBackdrop')
    });
    this._setupDocumentKeyHandler();
  },

  willDestroyElement: function() {
    this.$().modal('hide');
    this._removeDocumentKeyHandler();
    this._removeBackdrop();
  },

  keyPress: function(event) {
    if (event.keyCode === 27) {
      this._triggerCallbackAndDestroy({
        close: true
      }, event);
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

  _removeBackdrop: function() {
    var _backdrop = this.$().parent().children('.modal-backdrop');
    if (this.get("fade")) {
      _backdrop.fade({always: function(){ _backdrop.remove();}});
    } else {
      _backdrop.remove();
    }
  },

  _setupDocumentKeyHandler: function() {
    var cc = this, handler = function(event) {
      cc.keyPress(event);
    };
    jQuery(window.document).bind('keyup', handler);
    this._keyUpHandler = handler;
  },

  _removeDocumentKeyHandler: function() {
    jQuery(window.document).unbind('keyup', this._keyUpHandler);
  },

  _resolveOrReject: function(options, event) {
    if (options.primary || options.secondary)
      this.resolve(options, event);
    else
      this.reject(options, event);
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
    if (!options)
      options = {};
    modalPane = this.create(options);
    rootElement = get(this, 'rootElement');
    modalPane.appendTo(rootElement);
    return modalPane;
  }
});
