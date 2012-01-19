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

Ember.ModalPane = SC.View.extend({
  className: 'modal',
  template: SC.Handlebars.compile(modalPaneTemplate),

  bodyViewClass: SC.View.extend({
    tagName: 'p',
    template: SC.Handlebars.compile('{{parentView.message}}')
  })
});
