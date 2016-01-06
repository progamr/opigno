<?php

/**
 * Implements hook_form().
 */
function learning_locker_stats_course_content_general_statistics_form(array $form, array &$form_state)
{
  $opigno_learning_locker=variable_get('opigno_learning_locker_stats_course_content_general_statistics_form_values');
  $form['display_period'] = array(
    '#type' => 'select',
    '#options' => array(
      OPIGNO_LEARNING_LOCKER_STATS_CURRENT_WEEK=> t('Current week'),
      OPIGNO_LEARNING_LOCKER_STATS_CURRENT_MONTH => t('Current month'),
      OPIGNO_LEARNING_LOCKER_STATS_CURRENT_YEAR => t('Current year'),
      OPIGNO_LEARNING_LOCKER_STATS_FOREVER => t('Forever')
    ),
    '#ajax' => array(
      'callback' => 'opigno_learning_locker_stats_course_content_general_statistics_form_ajax_submit',
      'wrapper' => 'learning-locker-stats-course-content',
      'method' => 'replace'
    ),
    '#default_value' => $opigno_learning_locker['display_period'],
  );

  return $form;
}

/**
 * Implements hook_form_submit().
 */
function opigno_learning_locker_stats_course_content_general_statistics_form_ajax_submit($form, &$form_state)
{
  variable_set('opigno_learning_locker_stats_course_content_general_statistics_form_values', $form_state['values']);
  return opigno_learning_locker_stats_course_content_page();
}