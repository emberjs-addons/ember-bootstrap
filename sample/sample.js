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
