# Ember Bootstrap [![Travis](https://secure.travis-ci.org/jzajpt/ember-bootstrap.png)](http://travis-ci.org/jzajpt/ember-bootstrap)


Ember Bootstrap is set of UI elements styled using Twitter Bootstrap (currently version 2) toolkit to use with Ember.js. The ultimate goal is to provide all elements from the Bootstrap toolkit.

## Is this thing even usable?

Nope, not yet. So either fork, do your magic and send pull request or move along.


## What's implemented so far?

### Views
* Buttons - Bootstrap.Button
* Modal panes - Bootstrap.ModalPane
* Nav lists - Bootstrap.NavList
* Pills - Bootstrap.Pills
* Tabs (header) - Bootstrap.Tabs
* Alert messages - Bootstrap.AlertMessage
* Block alert messages - Bootstrap.BlockAlertMessage
* Progress bars - Bootstrap.ProgressBar

### Forms
* Text Field - Bootstrap.Forms.TextField
* Text Area  - Bootstrap.Forms.TextArea


## Usage

### Bootstrap.Button

Button class automatically provides necessary classes (`.btn`) and binds type
property to class (for example `.btn-info` for info type) and if button 
is disabled `disabled` class.

```html
<script type="text/x-handlebars">
  {{view Bootstrap.Button type=info disabled=true}}Hello{{/view}}
</script>
```
 

### Bootstrap.ModalPane

```javascript
Bootstrap.ModalPane.popup({
  heading: "Sample modal pane",
  message: "Sample message...",
  primary: "OK",
  secondary: "Cancel",
  showBackdrop: true,
  callback: function(opts, event) {
    if (opts.primary) {
     // primary button was pressed
    } else if (opts.secondary) {
      // secondary button was pressed
    } else {
      // close was pressed
    }
  }
});
```


### Bootstrap.NavList

```html
<script type="text/x-handlebars">
  {{view Bootstrap.NavList
      contentBinding="SampleApp.navController.content"
      selectionBinding="SampleApp.navController.selection"}}
</script>
```


### Bootstrap.Tabs

```html
<script type="text/x-handlebars">
  {{view Bootstrap.Tabs
      contentBinding="SampleApp.tabsController.content"
      selectionBinding="SampleApp.tabsController.selection"}}
</script>
```


### Bootstrap.Pills

```html
<script type="text/x-handlebars">
  {{view Bootstrap.Pills
      contentBinding="SampleApp.pillsController.content"
      selectionBinding="SampleApp.pillsController.selection"}}
</script>
```


### Bootstrap.AlertMessage

```html
<script type="text/x-handlebars">
  {{view Bootstrap.AlertMessage type="success" message="You did it!"}}
</script>
```


### Bootstrap.ProgressBar

```html
<script type="text/x-handlebars">
  {{view Bootstrap.ProgressBar isStriped=true isAnimated=true 
      progressBinding="SampleApp.progressController.progress"}}
</script>
```


### Bootstrap.Forms.TextField
```html
<script type="text/x-handlebars">
  {{view EmBootstrap.TextField valueBinding="myObject.content" label="content"}}
</script>
```


### Bootstrap.Forms.TextArea
```html
<script type="text/x-handlebars">
  {{view EmBootstrap.TextArea valueBinding="myObject.content" label="content"}}
</script>
```


## Unit Tests

To run unit tests, run `bundle exec rackup` from the root directory and visit
`http://localhost:9292/tests/index.html?package=ember-bootstrap`.


## Authors & contributors

* Jiri Zajpt <jz@blueberry.cz>
* Damien Mathieu <42@dmathieu.com>
* Franck Verrot <franck@verrot.fr>
