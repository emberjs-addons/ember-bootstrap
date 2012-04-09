SampleApp = Ember.Application.create();


SampleApp.modalPaneController = Ember.Object.create({
  popup: function() {
    Bootstrap.ModalPane.popup({
      heading: 'Sample modal pane',
      message: "Oh hell, how cool is this? It probably isn't.",
      primary: "Okey",
      secondary: "WAT",
      callback: function() {
        if (window.console) console.log('dialog was closed');
      }
    });
  }
});

SampleApp.pillsController = Ember.Object.create({
  content: ['Pill A', 'Pill B', 'Pill C'],
  selection: 'Pill A'
});

SampleApp.tabsController = Ember.Object.create({
  content: ['Tab A', 'Tab B', 'Tab C'],
  selection: 'Tab A'
});

SampleApp.progressController = Ember.Object.create({
  progress: 0,

  init: function() {
    this._super();
    var that = this;
    setInterval(function() {
      var progress = that.get('progress');
      if (progress <= 100) that.incrementProperty('progress');
      else that.set('progress', 0);
    }, 150);
  }
});

SampleApp.navListController = Ember.Object.create({
  content: ['Tab A', 'Tab B', 'Tab C'],
  selection: 'Tab A'
});

SampleApp.buttonGroupController = Ember.Object.create({
  content: ['Tab A', 'Tab B', 'Tab C'],
  selection: 'Tab A'
});

