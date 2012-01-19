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

Ember.ModalPane = Ember.View.extend({
  className: 'modal',
  template: Ember.Handlebars.compile(modalPaneTemplate),

  bodyViewClass: Ember.View.extend({
    tagName: 'p',
    template: Ember.Handlebars.compile('{{parentView.message}}')
  })
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

