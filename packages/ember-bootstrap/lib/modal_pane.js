var modalPaneTemplate = '\
<div class="modal-header"> \
  <a href="#" class="close" rel="close">×</a> \
  <h3>{{heading}}</h3> \
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
  bodyViewClass: Ember.View.extend({
    tagName: 'p',
    template: Ember.Handlebars.compile('{{parentView.message}}')
  }),

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

  didInsertElement: function() {
    var parentLayer = this.$().parent();
    this._backdrop = $(modalPaneBackdrop).appendTo(parent);
  },

  willDestroyElement: function() {
    this._backdrop.remove();
  },

  keyPress: function(event) {
    if (event.keyCode === 27) {
      this._triggerCallbackAndDestroy({ close: true }, event);
    }
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

