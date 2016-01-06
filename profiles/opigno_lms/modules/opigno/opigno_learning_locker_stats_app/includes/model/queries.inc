<?php

/**
 * @file
 * Implements functions to query statements
 */

/**
 * Retrieve all statements from LRS (caching for current request)
 *
 * @return array
 */
function opigno_learning_locker_stats_all_statements() {
  $all_statements = &drupal_static(__FUNCTION__);
  if(!isset($all_statements)) $all_statements = opigno_learning_locker_stats_query(opigno_learning_locker_stats_query_new_pipeline());
  return $all_statements;
}

/**
 * Retrieve all viewed statements from LRS (caching for current request)
 *
 * @return array
 */
function opigno_learning_locker_stats_all_viewed_statements() {
  $viewed_statements = &drupal_static(__FUNCTION__);
  if(!isset($viewed_statements))
  {
    $viewed_statements = opigno_learning_locker_stats_query(
      opigno_learning_locker_stats_query_scope_viewed_statements(
        opigno_learning_locker_stats_query_new_pipeline()
      )
    );
  }
  return $viewed_statements;
}

/**
 * Retrieve all viewed statements that happened this week
 *
 * @return array
 */
function opigno_learning_locker_stats_current_week_viewed_statements() {
  return opigno_learning_locker_stats_filter_current_week_statements(
    opigno_learning_locker_stats_all_viewed_statements()
  );
}

/**
 * Retrieve all viewed statements that happened this month
 *
 * @return array
 */
function opigno_learning_locker_stats_current_month_viewed_statements() {
  return opigno_learning_locker_stats_filter_current_month_statements(
    opigno_learning_locker_stats_all_viewed_statements()
  );
}

/**
 * Retrieve all viewed statements that happened this year
 *
 * @return array
 */
function opigno_learning_locker_stats_current_year_viewed_statements() {
  return opigno_learning_locker_stats_filter_current_year_statements(
    opigno_learning_locker_stats_all_viewed_statements()
  );
}

/**
 * Retrieve all course content statements (caching for current request)
 *
 * @return array
 */
function opigno_learning_locker_stats_all_course_content_statements() {
  $course_content_statements = &drupal_static(__FUNCTION__);
  if(!isset($course_content_statements))
  {
    $course_content_statements = opigno_learning_locker_stats_query(
      opigno_learning_locker_stats_query_scope_course_context(
        opigno_learning_locker_stats_query_scope_unwind_context(
          opigno_learning_locker_stats_query_new_pipeline()
        )
      )
    );
  }
  return $course_content_statements;
}

/**
 * Retrieve all course content viewed statements (caching for current request)
 *
 * @return array
 */
function opigno_learning_locker_stats_all_course_content_viewed_statements() {
  $course_content_viewed_statements = &drupal_static(__FUNCTION__);
  if(!isset($course_content_viewed_statements))
  {
    $course_content_viewed_statements = opigno_learning_locker_stats_query(
      opigno_learning_locker_stats_query_scope_viewed_statements(
        opigno_learning_locker_stats_query_scope_course_context(
          opigno_learning_locker_stats_query_scope_unwind_context(
            opigno_learning_locker_stats_query_new_pipeline()
          )
        )
      )
    );
  }
  return $course_content_viewed_statements;
}

/**
 * Retrieve all course content finished statements (caching for current request)
 *
 * @return array
 */
function opigno_learning_locker_stats_all_course_content_finished_statements() {
  $course_content_finished_statements = &drupal_static(__FUNCTION__);
  if(!isset($course_content_finished_statements))
  {
    $course_content_finished_statements = opigno_learning_locker_stats_query(
      opigno_learning_locker_stats_query_scope_finished_statements(
        opigno_learning_locker_stats_query_scope_course_context(
          opigno_learning_locker_stats_query_scope_unwind_context(
            opigno_learning_locker_stats_query_new_pipeline()
          )
        )
      )
    );
  }
  return $course_content_finished_statements;
}

/**
 * Retrieve all statements related to a quiz
 *
 * @return array
 */
function opigno_learning_locker_stats_all_statements_with_quiz_object() {
  return opigno_learning_locker_stats_query(
    opigno_learning_locker_stats_query_scope_quiz_object(
      opigno_learning_locker_stats_query_new_pipeline()
    )
  );
}
