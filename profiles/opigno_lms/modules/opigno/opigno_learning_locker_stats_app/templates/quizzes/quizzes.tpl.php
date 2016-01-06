<?php
/**
 * @file
 * Quizzes template file
 *
 * @param array $quizzes
 */
?>
<div id="learning-locker-stats-quizzes">
  <div class="learning-locker-stats-widget" id="learning-locker-stats-widget-quizzes-widget">
    <?php print theme('opigno_learning_locker_stats_quizzes_list', compact('quizzes')); ?>
  </div>
</div>