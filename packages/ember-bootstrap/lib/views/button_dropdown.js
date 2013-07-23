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
     * @property layout
     * @type {Function}
     */
    layout: Ember.Handlebars.compile('<a {{bindAttr class="view.typeClass :btn :dropdown-toggle" }} data-toggle="dropdown" href="javascript:void(0);">{{view.label}}<span class="caret"></span></a>' +
                                     '<ul class="dropdown-menu">{{yield}}</ul>'),

    /**
     * @property template
     * @type {Function}
     */
    template: Ember.Handlebars.compile('{{#if view.items}} {{#each item in view.items}}' +
                                       '<li {{bindAttr class="item.disabled:disabled"}}>{{view view.Item contextBinding="item"}}</li>' +
                                       '{{/each}} {{/if}}'),

    /**
     * @method didInsertElement
     * @return {void}
     */
    didInsertElement: function() {

        var items   = Ember.get(this, 'items'),
            forEach = Ember.EnumerableUtils.forEach;

        forEach(items, function(item) {

            // Iterate over the items, and if the `disabled` property changes, notify the
            // view of an update.
            Ember.addObserver(item, 'disabled', function() {
                this.notifyPropertyChange('view.items');
            });

        }, this);

    },

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
        href: Ember.computed(function() {
            return 'javascript:void(0);';
        }),

        /**
         * @method click
         * Attempt to invoke the specified action name on the controller.
         * @return {void}
         */
        click: function() {

            var item        = Ember.get(this, 'context'),
                actionName  = Ember.get(item, 'actionName'),
                controller  = Ember.get(this, 'controller');

            if (Ember.get(item, 'disabled') === true) {
                // We won't invoke the action if it's disabled.
                return;
            }

            Ember.assert('View `Bootstrap.ButtonDropdown` does not have a controller attached.', !!Ember.get(this, 'controller'));
            Ember.assert('Controller `%@` does not have an action `%@`!'.fmt(controller, actionName), !!Ember.canInvoke(controller, actionName));

            // Invoke the action on the controller, passing in the item as the first param.
            Ember.tryInvoke(controller, actionName, item);

        }

    })

});