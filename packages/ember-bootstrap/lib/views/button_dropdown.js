/**
* @property buttonDropdownTemplate
* @type {String}
*/
var buttonDropdownTemplate = [
  '<a {{bindAttr class="view.typeClass :btn :dropdown-toggle" }} data-toggle="dropdown" href="#">',
  '{{view.label}}',
  '<span class="caret"></span>',
  '</a>',
  '<ul class="dropdown-menu">',
  '   {{#if view.items}}',
  '       {{#each item in view.items}}',
  '           <li {{bindAttr class="item.disabled:disabled"}}>{{view view.Item contextBinding="item"}}</li>',
  '       {{/each}}',
  '   {{/if}}',
  '</ul>'
].join("\n");

/**
* @property Bootstrap.ButtonDropdown
* @type {Ember.View}
*/
Bootstrap.ButtonDropdown = Ember.View.extend({

  /**
  * @property label
  * @type {String}
  */
  label: null,

  /**
  * @property items
  * @type {Array}
  */
  items: [],

  /**
  * @property classNames
  * @type {Array}
  */
  classNames: ['btn-group'],

  /**
  * @property defaultTemplate
  * @type {String}
  */
  defaultTemplate: Ember.Handlebars.compile(buttonDropdownTemplate),

  /**
  * @property Item
  * @type {Ember.View}
  */
  Item: Ember.View.extend({

    /**
    * @property tagName
    * @type {String}
    * @default "a"
    */
    tagName: 'a',

    /**
    * @property attributeBindings
    * @type {Array}
    */
    attributeBindings: ['href'],

    /**
    * @property template
    * @type {Function}
    */
    template: Ember.Handlebars.compile('{{label}}'),

    /**
    * @property href
    * @type {Object}
    * @return {String}
    */
    href: '#',

    /**
    * @method click
    * Attempt to invoke the specified action name on the controller.
    * @return {void}
    */
    click: function() {

      var item        = Ember.get(this, 'context'),
          actionName  = Ember.get(item, 'actionName'),
          controller  = Ember.get(this, 'controller');
      var disabled    = Ember.get(item, 'disabled');

      if (disabled === true) {
        // We won't invoke the action if it's disabled.
        return;
      }

      Ember.assert('View `Bootstrap.ButtonDropdown` does not have a controller attached.', !!Ember.get(this, 'controller'));
      Ember.assert(Ember.String.fmt('Controller `%@` does not have an action `%@`!', controller, actionName), !!Ember.canInvoke(controller, actionName));

      // Invoke the action on the controller, passing in the item as the first param.
      Ember.tryInvoke(controller, actionName, [item]);
    }

  })

});
