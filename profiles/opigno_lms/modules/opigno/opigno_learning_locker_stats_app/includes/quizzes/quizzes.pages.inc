<?php

/**
 * @file
 * Quizzes pages
 */

require_once(__DIR__ . '/model.inc');

/**
 * Display quizzes statistics page
 */
function opigno_learning_locker_stats_quizzes_page() {
  $module_path = drupal_get_path('module', 'opigno_learning_locker_stats_app');
  drupal_add_js("{$module_path}/js/jquery.tablesorter.min.js");
  drupal_add_js("{$module_path}/js/script.js");
  drupal_add_css("{$module_path}/css/styles.css", 'theme');
  return theme('opigno_learning_locker_stats_quizzes', array('quizzes' => opigno_learning_locker_stats_quizzes_quizzes_statistics()));
}