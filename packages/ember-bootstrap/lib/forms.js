window.Bootstrap.Forms = Ember.Namespace.create({

  human: function(value) {
    if (value === undefined || value === false)
      return;

    // Underscore string
    value = Ember.String.decamelize(value);
    // Replace all _ with spaces
    value = value.replace(/_/g, " ");
    // Capitalize the first letter of every word
    value = value.replace(/(^|\s)([a-z])/g, function(m,p1,p2){ return p1+p2.toUpperCase(); });
    return value;
  }
});
