<?php
/**
 * @file
 * Opigno Learning Locker stats - Dashboard - Last statements template file
 *
 * @param array $last_statements
 */
?>
<div class="learning-locker-stats-widget col col-3-out-of-6" id="learning-locker-stats-widget-dashboard-last-statements">
  <h2><?php print t('Last statements'); ?></h2>
  <?php print theme('opigno_learning_locker_stats_statements_list', array('statements' => $last_statements)); ?>
</div>