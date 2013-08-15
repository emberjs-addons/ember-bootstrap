---
title: Forms
description: A suite of helpers built to facilitate displaying forms.
---

## TextField

    {{view Bootstrap.Forms.TextField
      valueBinding="content"
      label="Your Field Label"
      help="This is an optional help message"}}

<script type="text/x-handlebars" id="textField">
  <div class="row">
    <div class="col-lg-6">
      {{view Bootstrap.Forms.TextField valueBinding="content" label="Your Field Label" help="This is an optional help message"}}
    </div>
    <div class="col-lg-6">{{content}}</div>
  </div>
</script>
<div data-ember="textField"></div>

## TextArea

    {{view Bootstrap.Forms.TextArea
      valueBinding="content"
      label="Your Field Label"}}

<script type="text/x-handlebars" id="textArea">

  <div class="row">
    <div class="col-lg-6">
      {{view Bootstrap.Forms.TextArea valueBinding="content" label="Your Field Label"}}
    </div>
    <div class="col-lg-6">{{content}}</div>
  </div>
</script>
<div data-ember="textArea"></div>

## Select

    {{view Bootstrap.Forms.Select
      contentBinding="content"
      selectionBinding="selected"
      label="Your Field Label"
      prompt="Select a language"
      optionLabelPath="content.name"
      optionValuePath="content.value"}}

<script type="text/x-handlebars" id="select">
  <div class="row">
    <div class="col-lg-6">
      {{view Bootstrap.Forms.Select contentBinding="content" selectionBinding="selected" label="Your Field Label" prompt="Select a language" optionLabelPath="content.name" optionValuePath="content.value"}}
    </div>
    <div class="col-lg-6">{{selected.value}}</div>
  </div>
</script>
<script type="text/javascript">
  jQuery(window).load(function() {
    var app = apps.select;
    var controller = app.__container__.lookup("controller:select");
    controller.set('content', [
      Ember.Object.create({name: 'English', value: 'Hello World'}),
      Ember.Object.create({name: 'French', value: 'Bonjour le monde'})
    ]);
  });
</script>
<div data-ember="select"></div>

## Uneditable Input

    {{view Bootstrap.Forms.UneditableInput
      valueBinding="content"
      label="Your Field Label"
      help="This is an optional help message"}}

<script type="text/x-handlebars" id="unEditable">
  <div class="row">
    <div class="col-lg-6">
      {{view Bootstrap.Forms.UneditableInput valueBinding="content" label="Your Field Label" help="This is an optional help message"}}
    </div>
  </div>
</script>
<script type="text/javascript">
  jQuery(window).load(function() {
    var app = apps.unEditable;
    var controller = app.__container__.lookup("controller:unEditable");
    controller.set('content', 'Hello World');
  });
</script>
<div data-ember="unEditable"></div>
