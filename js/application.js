jQuery(document).ready(function() {
  window.apps = {}

  jQuery.each(jQuery('[data-ember]'), function(i, el) {
    el.setAttribute('id', 'demoapp-' + i);
    var route = el.getAttribute('data-ember');
    var app = Ember.Application.create({
      rootElement: '#demoapp-' + i
    });
    app.Router.map(function() {
      this.route(route, {path: '/'});
    });
    apps[route] = app;

  });
});
