(function($) {

Drupal.stanley = Drupal.stanley || {};

// Stanley Behaviors
Drupal.behaviors.stanley = {};
Drupal.behaviors.stanley.attach = function(context) {
  // Taskbar
  Drupal.stanley.taskBar();

  // Table header offset
  Drupal.settings.tableHeaderOffset = 'Drupal.stanley.tableHeaderOffset';

  // Recalculate taskbar position on open/close toolbar drawer
  $('#toolbar a.toggle').bind('click', Drupal.stanley.taskBar);
}

// Taskbar
Drupal.stanley.taskBar = function() {
  var tasksHeight = $('#tasks').height();
  var toolbarHeight = $('#toolbar').height();
  $("#tasks").css('top', toolbarHeight + 'px');
  $("body").css('padding-top', tasksHeight + toolbarHeight + 'px');
}

// Table header offset
Drupal.stanley.tableHeaderOffset = function() {
  return $('#tasks').height() + $('#toolbar').height();
}


})(jQuery);
