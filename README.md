# Ember Bootstrap [![Travis](https://secure.travis-ci.org/emberjs-addons/ember-bootstrap.png?branch=master)](http://travis-ci.org/emberjs-addons/ember-bootstrap)

Ember Bootstrap is set of UI elements styled using Twitter Bootstrap (currently version 2) toolkit to use with Ember.js.
The ultimate goal is to provide all elements from the Bootstrap toolkit.

Please respect the following convention : bug reports go in the [issue tracker](https://github.com/emberjs-addons/ember-bootstrap/issues?state=open).
Feature and big refactoring discussions go in the [google group](https://groups.google.com/forum/#!forum/ember-bootstrap).

## What's implemented so far?

### Views
* Modal panes - Bootstrap.ModalPane
* Nav lists - Bootstrap.NavList
* Pills - Bootstrap.Pills
* Tabs (header) - Bootstrap.Tabs
* Alert messages - Bootstrap.AlertMessage
* Block alert messages - Bootstrap.BlockAlertMessage
* Progress bars - Bootstrap.ProgressBar
* Badges - Bootstrap.Badge
* Labels - Bootstrap.Label
* Wells - Bootstrap.Well

### Forms
* Text Field - Bootstrap.Forms.TextField
* Text Area  - Bootstrap.Forms.TextArea
* Select     - Bootstrap.Forms.Select


## Usage

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


### Bootstrap.Label

```html
<script type="text/x-handlebars">
  {{view Bootstrap.Label type="important" content="Important"}}
</script>
```


### Bootstrap.Badge

```html
<script type="text/x-handlebars">
  {{view Bootstrap.Badge type="success" contentBinding="SampleApp.TodoController.completed"}}
</script>
```


### Bootstrap.Well

```html
<script type="text/x-handlebars">
  {{view Bootstrap.Well content="Important note about Ember and Bootstrap" }}
</script>
```


### Bootstrap.Breadcrumbs

```html
<script type="text/x-handlebars">
  {{view Bootstrap.Breadcrumbs contentBinding="SampleApp.breadcrumbsController.content" }}
</script>
```


### Bootstrap.Pager

```html
<script type="text/x-handlebars">
  {{view Bootstrap.Pager contentBinding="SampleApp.pagerController.content" }}
</script>
```


### Bootstrap.Pagination

```html
<script type="text/x-handlebars">
  {{view Bootstrap.Pagination contentBinding="SampleApp.paginationController.content" selectionBinding="SampleApp.paginationController.selection" }}
</script>
```

### Bootstrap.Forms.TextField
```html
<script type="text/x-handlebars">
  {{view Bootstrap.Forms.TextField valueBinding="myObject.content" label="content" help="This is an optional help message"}}
</script>
```


### Bootstrap.Forms.TextArea
```html
<script type="text/x-handlebars">
  {{view Bootstrap.Forms.TextArea valueBinding="myObject.content" label="content"}}
</script>
```

### Bootstrap.Forms.Select
```html
<script type="text/x-handlebars">
  {{view Bootstrap.Forms.Select contentBinding="content" selectionBinding="selected" label="content" optionLabelPath="content.name" optionValuePath="content.internalName"}}
</script>
```

## Building Ember Bootstrap

1. Run `rake` to build Ember Bootstrap. Three builds will be placed in the `dist/` directory.
 *  `ember-bootstrap.js`, `ember-bootstrap.min.js` and `ember-bootstrap.prod.js` - unminified and minified builds as well as a production ready build with assertions, deprecations and warnings stripped.

If you are building under Linux, you will need a JavaScript runtime for minification.
You can either install nodejs or `gem install therubyracer`.

## Unit Tests

To run unit tests, run `bundle exec rackup` from the root directory and visit
`http://localhost:9292/tests/index.html?package=ember-bootstrap`.


### License

MIT License. Copyright 2012 Jiri Zajpt, Damien Mathieu


## Authors & contributors

* Jiri Zajpt <jz@blueberry.cz>
* Damien Mathieu <42@dmathieu.com>
* Franck Verrot <franck@verrot.fr>
* Bradley Priest <hello@bradleypriest.com>
