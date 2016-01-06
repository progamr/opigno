var H5P = H5P || {};

/**
 * Guess the answer module
 * @external {jQuery} $ H5P.jQuery
 */
H5P.GuessTheAnswer = (function ($) {
  // CSS Classes:
  var MAIN_CONTAINER = 'h5p-guess-answer';
  var TITLE_CONTAINER = 'h5p-guess-answer-title';
  var IMAGE_CONTAINER = 'h5p-guess-answer-image-container';
  var SOLUTION_CONTAINER = 'h5p-guess-answer-solution-container';

  // CSS Subclasses:
  var IMAGE = 'h5p-guess-answer-image';
  var SHOWING_SOLUTION = 'h5p-guess-answer-showing-solution';

  /**
   * Initialize module.
   * @param {Object} params Behavior settings
   * @param {Number} id Content identification
   * @returns {Object} C Counter instance
   */
  function C(params, id) {
    this.$ = $(this);
    this.id = id;

    // Set default behavior.
    this.params = $.extend({}, {
      taskDescription: '',
      solutionLabel: 'Click to see the answer.',
      solutionImage: null,
      solutionText: ''
    }, params);
  }

  /**
   * Attach function called by H5P framework to insert H5P content into page.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  C.prototype.attach = function ($container) {
    this.$inner = $container.addClass(MAIN_CONTAINER)
      .html('<div></div>')
      .children();

    //Attach task description, if provided.
    this.addTaskDescriptionTo(this.$inner);

    //Attach image, if provided.
    this.addImageTo(this.$inner);

    //Attach solution container.
    this.addSolutionContainerTo(this.$inner);
  };

  /**
   * Adds a task description if provided in semantics, to the provided container.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  C.prototype.addTaskDescriptionTo = function ($container) {
    if (this.params.taskDescription) {
      $('<div/>', {
        'class': TITLE_CONTAINER,
        html: this.params.taskDescription
      }).appendTo($container);
    }
  };

  /**
   * Adds image to the provided container.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  C.prototype.addImageTo = function ($container) {
    var self = this;

    if (self.params.solutionImage === null) {
      return;
    }
    var $img = null;

    var $imageHolder = $('<div/>', {
      'class': IMAGE_CONTAINER
    }).appendTo($container);

    if (self.params.solutionImage && self.params.solutionImage.path) {
      var imageWidth = self.params.solutionImage.width;
      if ($container.width() < self.params.solutionImage.width) {
        imageWidth = $container.width();
      }

      var imageHeight = (imageWidth / self.params.solutionImage.width) * self.params.solutionImage.height;

      $img = $('<img/>', {
        'class': IMAGE,
        src: H5P.getPath(self.params.solutionImage.path, self.id)
      }).css({width: imageWidth, height: imageHeight}).appendTo($imageHolder);

      $img.load(function () {
        self.imageNaturalWidth = this.naturalWidth;
        self.imageNaturalHeight = this.naturalHeight;
        self.resize();
      });
    }

    self.$img = $img;
  };

  /**
   * Adds a solution container to the provided container.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  C.prototype.addSolutionContainerTo = function ($container) {
    var self = this;

    self.$solutionContainer = $('<div/>', {
      'class': SOLUTION_CONTAINER,
      html: this.params.solutionLabel
    }).click(function () {
      $(this).addClass(SHOWING_SOLUTION).html(self.params.solutionText);
    }).appendTo($container);
  };

  /**
   * Resize function for responsiveness.
   */
  C.prototype.resize = function () {
    var self = this;
    var solutionWidth = this.$inner.width();

    //Rescale image if defined.
    if (this.$img !== undefined) {
      //Enlarge window dimensions
      if (this.$inner.width() > this.imageNaturalWidth) {
        this.$img.width(this.imageNaturalWidth);
        solutionWidth = this.imageNaturalWidth;
        this.$img.height(this.imageNaturalHeight);
      } else {
        //Reduce window dimensions
        this.$img.width(this.$inner.width());
        solutionWidth = this.$inner.width();
        this.$img.height(this.imageNaturalHeight / (this.imageNaturalWidth / this.$inner.width()));
      }
    }

    //Set width for solution container.
    this.$solutionContainer.width(solutionWidth);

    //Resize height to enclose all text tightly.
    this.$solutionContainer.css('height', 'initial');
    var maxHeight = self.$solutionContainer.height();

    //Check if additional height is required for solution text.
    if (!this.$solutionContainer.hasClass(SHOWING_SOLUTION)) {
      this.$solutionContainer.html(this.params.solutionText);
      maxHeight = maxHeight < self.$solutionContainer.height() ? self.$solutionContainer.height() : maxHeight;
      self.$solutionContainer.html(self.params.solutionLabel).css('height', maxHeight + 'px');
    }
  };

  return C;
})(H5P.jQuery);