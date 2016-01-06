<?php

/**
 * @file
 * Course content statistics pages
 */

require_once(__DIR__ . '/general_statistics_form.inc');
require_once(__DIR__ . '/model.inc');

/**
 * Display courses statistic page
 */
function opigno_learning_locker_stats_course_content_page() {
  $module_path = drupal_get_path('module', 'opigno_learning_locker_stats_app');
  drupal_add_css("{$module_path}/css/styles.css", 'theme');
  $opigno_learning_locker=variable_get('opigno_learning_locker_stats_course_content_general_statistics_form_values');
  switch($opigno_learning_locker['display_period']) {
    case OPIGNO_LEARNING_LOCKER_STATS_CURRENT_WEEK:
      $statement_filter_function = 'opigno_learning_locker_stats_filter_current_week_statements';
    break;
    case OPIGNO_LEARNING_LOCKER_STATS_CURRENT_MONTH:
      $statement_filter_function = 'opigno_learning_locker_stats_filter_current_month_statements';
    break;
    case OPIGNO_LEARNING_LOCKER_STATS_CURRENT_YEAR:
      $statement_filter_function = 'opigno_learning_locker_stats_filter_current_year_statements';
    break;
    case OPIGNO_LEARNING_LOCKER_STATS_FOREVER:
    default:
      $statement_filter_function = NULL;
    break;
  }

  return theme('opigno_learning_locker_stats_course_content', array(
    'general_statistics' => opigno_learning_locker_stats_course_content_general_statistics($statement_filter_function),
    'course_contexts_statistics' => opigno_learning_locker_stats_course_content_course_contexts_statistics($statement_filter_function)
  ));
}