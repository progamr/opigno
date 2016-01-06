<?php
/**
 * @file
 * Opigno Learning Locker stats - Dashboard - Most active users template file
 *
 * @param array $most_active_users
 */
?>
<div class="learning-locker-stats-widget col col-3-out-of-6" id="learning-locker-stats-widget-dashboard-most-active-users">
  <h2><?php print t('Most active users'); ?></h2>
  <?php print theme('opigno_learning_locker_stats_dashboard_widget_most_active_users_list', compact('most_active_users')); ?>
</div>