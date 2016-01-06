<?php
/**
 * @file
 * Opigno Learning Locker stats - Course content - Course contexts statistics template file
 *
 * @param array $course_contexts_statistics
 */
?>
<div class="learning-locker-stats-widget" id="learning-locker-stats-widget-course-content-course-contexts-statistics">
  <h2><?php print t('Course context statistics'); ?></h2>
  <?php print theme('opigno_learning_locker_stats_course_content_widget_course_contexts_statistics_list', compact('course_contexts_statistics')); ?>
</div>