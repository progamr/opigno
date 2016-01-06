var H5P = H5P || {};

/**
 * Description Field module
 * @external {jQuery} $ H5P.jQuery
 */
H5P.DescriptionField = (function ($) {
  // CSS Classes:
  var MAIN_CONTAINER = 'h5p-description-field';
  var TEXT_FIELD = 'h5p-description-field-textfield';

  /**
   * Initialize module.
   * @param {Object} params Behavior settings
   * @param {Number} id Content identification
   * @returns {Object} DescriptionField DescriptionField instance
   */
  function DescriptionField(params, id) {
    this.$ = $(this);
    this.id = id;

    // Set default behavior.
    this.params = $.extend({}, {
      taskDescription: ''
    }, params);
  }

  /**
   * Attach function called by H5P framework to insert H5P content into page.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  DescriptionField.prototype.attach = function ($container) {
    var self = this;

    this.$inner = $container.addClass(MAIN_CONTAINER);

    $('<div>', {
      'class': TEXT_FIELD,
      'html': self.params.taskDescription
    }).appendTo(self.$inner);
  };

  return DescriptionField;
})(H5P.jQuery);