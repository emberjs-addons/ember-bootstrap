var modalPaneTemplate = '\
<div class="modal-header"> \
  <a href="#" class="close" rel="close">×</a> \
  {{view headerViewClass}} \
</div> \
<div class="modal-body">{{view bodyViewClass}}</div> \
<div class="modal-footer"> \
  {{#if primary}}<a href="#" class="btn primary" rel="primary">{{primary}}</a>{{/if}} \
  {{#if secondary}}<a href="#" class="btn secondary" rel="secondary">{{secondary}}</a>{{/if}} \
</div>';
var modalPaneBackdrop = '<div class="modal-backdrop"></div>';

Ember.ModalPane = Ember.View.extend({
  classNames: 'modal',
  template: Ember.Handlebars.compile(modalPaneTemplate),
  heading: null,
  message: null,
  primary: null,
  secondary: null,
  headerViewClass: Ember.View.extend({
    tagName: 'h3',
    template: Ember.Handlebars.compile('{{parentView.heading}}')
  }),
  bodyViewClass: Ember.View.extend({
    tagName: 'p',
    template: Ember.Handlebars.compile('{{{parentView.message}}}')
  }),

  didInsertElement: function() {
    this._appendBackdrop();
    this._setupDocumentKeyHandler();
  },

  willDestroyElement: function() {
    this._backdrop.remove();
    this._removeDocumentKeyHandler();
  },

  keyPress: function(event) {
    if (event.keyCode === 27) {
      this._triggerCallbackAndDestroy({ close: true }, event);
    }
  },

  click: function(event) {
    var target = $(event.target),
        targetRel = target.attr('rel');
    if (targetRel === 'close') {
      this._triggerCallbackAndDestroy({ close: true }, event);
    } else if (targetRel == 'primary') {
      this._triggerCallbackAndDestroy({ primary: true }, event);
    } else if (targetRel == 'secondary') {
      this._triggerCallbackAndDestroy({ secondary: true }, event);
    }
  },

  _appendBackdrop: function() {
    var parentLayer = this.$().parent();
    this._backdrop = $(modalPaneBackdrop).appendTo(parentLayer);
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

  _triggerCallbackAndDestroy: function(options, event) {
    if (this.callback) {
      this.callback(options, event);
    }
    this.destroy();
  }
});

Ember.ModalPane.reopenClass({
  popup: function(options) {
    var modalPane;
    if (!options) options = {}
    modalPane = this.create(options);
    modalPane.append();
    return modalPane;
  }
});

