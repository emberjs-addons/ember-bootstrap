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
  content: ['Pill A', 'Pill B', 'Pill C']
});

SampleApp.stackedPillsController = Ember.Object.create({
  content: ['Pill A', 'Pill B', 'Pill C']
});

SampleApp.tabsController = Ember.Object.create({
  content: ['Tab A', 'Tab B', 'Tab C']
});

SampleApp.stackedTabsController = Ember.Object.create({
  content: ['Tab A', 'Tab B', 'Tab C']
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
  content: ['Tab A', 'Tab B', 'Tab C']
});

SampleApp.buttonGroupController = Ember.Object.create({
  content: ['Tab A', 'Tab B', 'Tab C'],
  allowsEmptySelection: false
});

SampleApp.TodoController = Ember.Object.create({
  completed: 4,
  content: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11']
});
