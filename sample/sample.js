SampleApp = Ember.Application.create();


SampleApp.modalPaneController = Ember.Object.create({
  popup: function() {
    Ember.ModalPane.popup({
      heading: 'Sample modal pane',
      message: "Oh hell, how cool is this? It probably isn't.",
      primary: "Okey",
      secondary: "WAT"
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
